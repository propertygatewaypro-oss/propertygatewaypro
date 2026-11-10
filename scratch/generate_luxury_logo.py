import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def create_luxury_logo():
    # 2x supersampling for ultra-crisp antialiasing
    scale = 2
    size = 1024 * scale
    center = size // 2

    # Transparent base
    base = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # 1. Medallion Background: Luxury Warm Pearl Alabaster with soft gold radial sheen
    # Medallion rounded rect bounds
    pad = 48 * scale
    rad = 220 * scale
    rect = [pad, pad, size - pad, size - pad]

    # Draw rounded background mask
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle(rect, radius=rad, fill=255)

    # Gradient fill for medallion: Alabaster ivory to pearl travertine
    # Radial sheen centered at (512, 440)
    cx, cy = size * 0.5, size * 0.45
    y, x = np.ogrid[:size, :size]
    dist = np.sqrt((x - cx)**2 + (y - cy)**2)
    max_d = size * 0.65
    ratio = np.clip(dist / max_d, 0, 1)

    # Pearl palette: from (255, 255, 255) to (248, 245, 238) to (242, 236, 226)
    r_chan = np.clip(255 - ratio * 14, 0, 255).astype(np.uint8)
    g_chan = np.clip(255 - ratio * 20, 0, 255).astype(np.uint8)
    b_chan = np.clip(255 - ratio * 28, 0, 255).astype(np.uint8)
    a_chan = np.full((size, size), 255, dtype=np.uint8)

    medallion = Image.fromarray(np.dstack([r_chan, g_chan, b_chan, a_chan]), mode='RGBA')
    base.paste(medallion, (0, 0), mask)

    # 2. Metallic Brushed Gold Gradient Generator
    # 135-degree angle metallic gold: #7D5D2A -> #A88548 -> #E0C27E -> #F5E1B9 -> #B8914B -> #6E4E20
    diag = (x + y) / (2.0 * size)
    gold_stops = [
        (0.00, (125, 93, 42)),
        (0.20, (168, 133, 72)),
        (0.45, (224, 194, 126)),
        (0.55, (248, 230, 195)),
        (0.75, (184, 145, 75)),
        (0.90, (158, 125, 60)),
        (1.00, (110, 78, 32))
    ]

    def get_gold_color(t):
        t = t % 1.0
        for i in range(len(gold_stops) - 1):
            t0, c0 = gold_stops[i]
            t1, c1 = gold_stops[i+1]
            if t0 <= t <= t1:
                f = (t - t0) / (t1 - t0)
                return (
                    int(c0[0] + f * (c1[0] - c0[0])),
                    int(c0[1] + f * (c1[1] - c0[1])),
                    int(c0[2] + f * (c1[2] - c0[2])),
                    255
                )
        return (*gold_stops[-1][1], 255)

    gold_r = np.zeros((size, size), dtype=np.uint8)
    gold_g = np.zeros((size, size), dtype=np.uint8)
    gold_b = np.zeros((size, size), dtype=np.uint8)

    # Fast gradient computation using lookup
    lut = np.array([get_gold_color(i / 1000.0) for i in range(1000)], dtype=np.uint8)
    indices = np.clip((diag * 999).astype(int), 0, 999)
    gold_img = Image.fromarray(lut[indices], mode='RGBA')

    # 3. Emblem Vector Stencils
    stencil = Image.new('L', (size, size), 0)
    sdraw = ImageDraw.Draw(stencil)

    # Outer Gold Border
    border_w = 12 * scale
    sdraw.rounded_rectangle(rect, radius=rad, outline=255, width=border_w)

    # Inner Delicate Filigree Border
    inner_pad = pad + 36 * scale
    inner_rad = rad - 32 * scale
    inner_w = 3 * scale
    sdraw.rounded_rectangle([inner_pad, inner_pad, size - inner_pad, size - inner_pad], radius=inner_rad, outline=255, width=inner_w)

    # Crest Apex: 4-Point Daylight Diamond Star
    star_cy = int(145 * scale)
    star_r_long = 42 * scale
    star_r_short = 10 * scale
    star_pts = []
    for ang_deg in range(0, 360, 45):
        r = star_r_long if ang_deg % 90 == 0 else star_r_short
        rad_ang = math.radians(ang_deg - 90)
        star_pts.append((center + int(r * math.cos(rad_ang)), star_cy + int(r * math.sin(rad_ang))))
    sdraw.polygon(star_pts, fill=255)

    # Architectural Gateway (Arch Pillars & Head)
    arch_l = int(300 * scale)
    arch_r = int(724 * scale)
    arch_t = int(220 * scale)
    arch_b = int(820 * scale)
    pillar_w = int(46 * scale)

    # Outer Archway
    sdraw.rounded_rectangle([arch_l, arch_t, arch_r, arch_b], radius=int(212 * scale), outline=255, width=pillar_w)

    # Keystone at Arch Peak
    ks_w_top = int(48 * scale)
    ks_w_bot = int(36 * scale)
    ks_h = int(60 * scale)
    ks_y = arch_t - int(10 * scale)
    ks_pts = [
        (center - ks_w_top // 2, ks_y),
        (center + ks_w_top // 2, ks_y),
        (center + ks_w_bot // 2, ks_y + ks_h),
        (center - ks_w_bot // 2, ks_y + ks_h)
    ]
    sdraw.polygon(ks_pts, fill=255)

    # Inner Arch Rib
    rib_pad = pillar_w + int(24 * scale)
    sdraw.rounded_rectangle([arch_l + rib_pad, arch_t + rib_pad, arch_r - rib_pad, arch_b], radius=int(142 * scale), outline=255, width=int(8 * scale))

    # Classical Gateway Plinth Foundation Bases
    base_y1 = int(820 * scale)
    sdraw.rounded_rectangle([arch_l - int(36 * scale), base_y1, arch_r + int(36 * scale), base_y1 + int(24 * scale)], radius=int(6 * scale), fill=255)
    sdraw.rounded_rectangle([arch_l - int(60 * scale), base_y1 + int(28 * scale), arch_r + int(60 * scale), base_y1 + int(48 * scale)], radius=int(8 * scale), fill=255)

    # 4. Central Monogram 'P' & 'G'
    # Architectural Letter P
    p_x1 = int(410 * scale)
    p_stem_w = int(50 * scale)
    p_y_top = int(390 * scale)
    p_y_bot = int(760 * scale)
    p_bowl_r = int(525 * scale)
    p_bowl_h = int(180 * scale)

    # P Stem
    sdraw.rounded_rectangle([p_x1, p_y_top, p_x1 + p_stem_w, p_y_bot], radius=int(8 * scale), fill=255)
    # P Bowl
    sdraw.rounded_rectangle([p_x1, p_y_top, p_bowl_r, p_y_top + p_bowl_h], radius=int(90 * scale), outline=255, width=p_stem_w)

    # Architectural Letter G (Sweeping lower curve & crossbar)
    g_x1 = int(495 * scale)
    g_x2 = int(630 * scale)
    g_y1 = int(530 * scale)
    g_y2 = int(760 * scale)
    g_thick = int(48 * scale)

    # G main circle curve
    sdraw.rounded_rectangle([g_x1 - int(105 * scale), g_y1, g_x2, g_y2], radius=int(115 * scale), outline=255, width=g_thick)
    # G crossbar & spur
    sdraw.rectangle([center, int(645 * scale), g_x2, int(645 * scale) + g_thick], fill=255)
    sdraw.rectangle([g_x2 - g_thick, int(645 * scale), g_x2, g_y2 - int(40 * scale)], fill=255)

    # Mask cutout for overlap clarity
    cutout = Image.new('L', (size, size), 255)
    cdraw = ImageDraw.Draw(cutout)
    cdraw.rectangle([center - int(12 * scale), int(420 * scale), center + int(12 * scale), int(560 * scale)], fill=0)

    # Composite Gold onto Medallion
    base.paste(gold_img, (0, 0), stencil)

    # 5. Add Subtle Ambient Drop Shadow inside badge
    shadow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(shadow)
    sh_draw.rounded_rectangle(rect, radius=rad, outline=(125, 93, 42, 60), width=border_w + int(4 * scale))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=8 * scale))
    
    final_img = Image.alpha_composite(shadow, base)

    # Downsample with high-fidelity Lanczos antialiasing to final 1024x1024
    output_logo = final_img.resize((1024, 1024), Image.Resampling.LANCZOS)
    
    # Save to website and admin
    output_logo.save("website/public/logo.png", "PNG", optimize=True)
    output_logo.save("admin/public/logo.png", "PNG", optimize=True)
    print("Successfully generated high-res 1024x1024 luxury logo.png for website and admin")

if __name__ == "__main__":
    create_luxury_logo()
