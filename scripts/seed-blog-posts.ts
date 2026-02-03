import * as dotenv from 'dotenv';
import { Client } from 'pg';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function seedBlogPosts() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Get admin user ID (assuming first admin user)
    const adminResult = await client.query(
      "SELECT id FROM users WHERE role = 'Admin' LIMIT 1"
    );

    if (adminResult.rows.length === 0) {
      console.error('❌ No admin user found! Please create an admin user first.');
      process.exit(1);
    }

    const adminId = adminResult.rows[0].id;
    console.log(`📝 Using admin user ID: ${adminId}`);

    // Blog posts data
    const blogPosts = [
      {
        title: '7 Tips Menghindari Mabuk Berat Saat Party',
        slug: 'tips-menghindari-mabuk-berat-saat-party',
        excerpt: 'Ingin enjoy party tanpa hangover esok hari? Simak 7 tips penting ini untuk tetap kontrol minum alkohol dan nikmati malam dengan bijak.',
        featured_image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&h=600&fit=crop',
        content: `
<h2>Kenapa Mabuk Berat Bisa Terjadi?</h2>
<p>Mabuk berat terjadi ketika kadar alkohol dalam darah meningkat terlalu cepat. Tubuh membutuhkan waktu untuk memproses alkohol, dan jika kita minum terlalu cepat, hati tidak bisa mengimbangi.</p>

<h2>1. Makan Sebelum dan Saat Party</h2>
<p><strong>Jangan pernah minum dengan perut kosong!</strong> Makanan di perut akan memperlambat penyerapan alkohol ke dalam aliran darah. Pilih makanan yang mengandung:</p>
<ul>
  <li>Protein (daging, telur, keju)</li>
  <li>Lemak sehat (alpukat, kacang)</li>
  <li>Karbohidrat kompleks (nasi, roti gandum)</li>
</ul>

<h2>2. Alternating: Minuman Beralkohol dan Air Putih</h2>
<p>Aturan emas: <em>satu gelas alkohol, satu gelas air putih</em>. Ini membantu:</p>
<ul>
  <li>Mencegah dehidrasi</li>
  <li>Memperlambat konsumsi alkohol</li>
  <li>Mengurangi risiko hangover</li>
</ul>

<h2>3. Ketahui Batas Toleransi Anda</h2>
<p>Setiap orang punya batas berbeda. Perhatikan sinyal tubuh seperti:</p>
<ul>
  <li>Pusing atau mual</li>
  <li>Kehilangan keseimbangan</li>
  <li>Bicara mulai tidak jelas</li>
</ul>
<p><strong>Jika sudah merasakan tanda-tanda ini, STOP!</strong></p>

<h2>4. Hindari Mixing Alkohol</h2>
<p>Mencampur jenis alkohol berbeda (beer, wine, spirits) dalam satu malam bisa membuat mabuk lebih cepat dan parah. Pilih satu jenis dan stick dengan itu.</p>

<h2>5. Pelan-Pelan, Jangan Buru-Buru</h2>
<p>Tubuh memproses sekitar <strong>satu standard drink per jam</strong>. Jangan ikutan shot games atau drinking challenges yang memaksa minum cepat.</p>

<h2>6. Pilih Minuman dengan ABV Rendah</h2>
<p>Beer atau wine cooler (4-5% ABV) lebih aman dibanding spirits (40% ABV). Jika ingin cocktail, pilih yang:</p>
<ul>
  <li>Tidak terlalu manis (gula bikin mabuk lebih cepat)</li>
  <li>Pakai mixer banyak (juice, soda)</li>
</ul>

<h2>7. Punya Transportation Plan</h2>
<p>Jangan kemudi kalau sudah minum! Siapkan:</p>
<ul>
  <li>Designated driver</li>
  <li>Budget untuk Grab/Gojek</li>
  <li>Atau menginap di dekat venue</li>
</ul>

<blockquote>
  <p>"Party cerdas bukan berarti tidak fun. Justru dengan tetap sadar, kamu bisa enjoy lebih lama dan ingat momen serunya!"</p>
</blockquote>

<h2>Bonus: What to Do Jika Sudah Terlanjur Mabuk</h2>
<p>Jika terlanjur mabuk berat:</p>
<ol>
  <li><strong>Stop minum alkohol</strong> - segera!</li>
  <li><strong>Minum air putih</strong> - sebanyak mungkin</li>
  <li><strong>Makan</strong> - carbs atau roti</li>
  <li><strong>Istirahat</strong> - duduk atau berbaring</li>
  <li><strong>Jangan ditinggal sendirian</strong> - stay with friends</li>
</ol>

<h2>Kesimpulan</h2>
<p>Enjoy party tanpa harus mabuk berat itu BISA! Kuncinya adalah <strong>kontrol, hidrasi, dan makan</strong>. Remember: nightlife Jakarta akan selalu ada, jaga kesehatan untuk party lagi minggu depan! 🎉</p>

<p><em>Stay safe, drink responsibly, and have fun!</em></p>
        `,
      },
      {
        title: 'Panduan PDKT di Club: 8 Tips yang Benar-Benar Work',
        slug: 'panduan-pdkt-di-club-tips-yang-work',
        excerpt: 'PDKT di club butuh strategi yang tepat. Dari body language, timing, hingga opening line - ini dia panduan lengkap untuk sukses approach di nightlife Jakarta.',
        featured_image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&h=600&fit=crop',
        content: `
<h2>Kenapa Club Jadi Tempat PDKT?</h2>
<p>Club adalah social space yang santai, musik bikin suasana fun, dan orang-orang datang untuk have fun dan meet new people. Tapi... ada seni tersendiri untuk approach yang <strong>respectful dan effective</strong>.</p>

<h2>1. Vibe Check: Baca Situasi Dulu</h2>
<p>Sebelum approach, observe dulu:</p>
<ul>
  <li><strong>Apakah dia terlihat open?</strong> (eye contact, senyum, body language terbuka)</li>
  <li><strong>Apakah dia dengan group?</strong> (jangan ganggu couple atau group yang closed circle)</li>
  <li><strong>Apakah dia terlihat enjoy?</strong> (jangan approach orang yang terlihat uncomfortable)</li>
</ul>

<blockquote>
  <p>"Red flag terbesar: kalau dia hindari eye contact atau body language closed (arms crossed, looking away). Respect that!"</p>
</blockquote>

<h2>2. Body Language Matters</h2>
<p>Sebelum bicara, body language berbicara lebih dulu:</p>
<ul>
  <li>✅ <strong>Stand confident</strong> - tapi bukan arrogant</li>
  <li>✅ <strong>Smile genuinely</strong> - bukan smirk</li>
  <li>✅ <strong>Eye contact</strong> - tapi jangan stare creepy</li>
  <li>✅ <strong>Open posture</strong> - hands visible, relaxed</li>
  <li>❌ <strong>Jangan</strong> - invade personal space terlalu dini</li>
</ul>

<h2>3. Timing is Everything</h2>
<p>Waktu terbaik untuk approach:</p>
<ul>
  <li><strong>Di bar</strong> - sambil waiting for drinks (natural setting)</li>
  <li><strong>Dance floor edge</strong> - saat mereka istirahat</li>
  <li><strong>Smoking area</strong> - suasana lebih tenang, bisa ngobrol</li>
  <li><strong>Between songs</strong> - saat musik agak pelan</li>
</ul>

<p><em>Timing terburuk:</em> Saat mereka lagi asik dance dengan teman, atau lagi ngobrol serius.</p>

<h2>4. Opening Line: Keep It Simple & Genuine</h2>
<p>JANGAN pakai pickup line cheesy! Coba yang natural:</p>

<p><strong>✅ GOOD:</strong></p>
<ul>
  <li>"Hey, enjoying the night? First time here?" (casual, friendly)</li>
  <li>"Love your vibe! Are you with the birthday group?" (observational)</li>
  <li>"This DJ is fire right? Kamu sering ke sini?" (shared interest)</li>
</ul>

<p><strong>❌ BAD:</strong></p>
<ul>
  <li>"Sendirian? Kasian deh..." (judgy vibes)</li>
  <li>"Kamu artis ya? Kok cantik banget..." (fake compliment)</li>
  <li>Anything sexual or inappropriate</li>
</ul>

<h2>5. Read the Response</h2>
<p>Setelah opening, pay attention:</p>

<p><strong>Green lights (lanjut!):</strong></p>
<ul>
  <li>Dia respond dengan senyum dan engage</li>
  <li>Maintain eye contact</li>
  <li>Ask questions back</li>
  <li>Body language facing you</li>
</ul>

<p><strong>Red lights (mundur dengan hormat!):</strong></p>
<ul>
  <li>One-word answers</li>
  <li>Looking away atau ke friends</li>
  <li>Says "I'm here with someone"</li>
  <li>Steps back atau turns away</li>
</ul>

<h2>6. Conversation Flow di Loud Environment</h2>
<p>Club itu keras! Tips ngobrol:</p>
<ul>
  <li><strong>Get closer</strong> - tapi minta izin dulu ("Mind if I get closer? Can't hear!")</li>
  <li><strong>Speak clearly</strong> - jangan teriak, tapi project voice</li>
  <li><strong>Use gestures</strong> - membantu komunikasi</li>
  <li><strong>Suggest moving</strong> - "Wanna talk outside? Lebih sepi!"</li>
</ul>

<h2>7. The Friend Group Strategy</h2>
<p>Jika dia datang dengan friends:</p>
<ol>
  <li><strong>Acknowledge the group</strong> - jangan ignore friends nya</li>
  <li><strong>Be friendly to everyone</strong> - impress the group, not just target</li>
  <li><strong>Ask permission</strong> - "Mind if I borrow your friend sebentar?"</li>
  <li><strong>Introduce your friends</strong> - bawa wingman yang bisa entertain group</li>
</ol>

<h2>8. Know When to Close... or Walk Away</h2>

<p><strong>If it's going well:</strong></p>
<ul>
  <li>"This is fun! Want to continue this outside?" (suggest moving)</li>
  <li>"Can I get your Instagram?" (social media less pressure than number)</li>
  <li>"Mau hang out lagi sometime?" (suggest future meet)</li>
</ul>

<p><strong>If it's not working:</strong></p>
<ul>
  <li>"Nice meeting you! Enjoy your night!" (exit gracefully)</li>
  <li>Don't linger, don't force</li>
  <li>Move on with dignity</li>
</ul>

<h2>Golden Rules yang WAJIB Diingat</h2>

<ol>
  <li><strong>CONSENT IS EVERYTHING</strong> - No means NO. Immediately.</li>
  <li><strong>Don't be creepy</strong> - no touching without permission</li>
  <li><strong>Respect personal space</strong> - physical boundaries matter</li>
  <li><strong>Don't be pushy</strong> - jika ditolak, terima dengan dewasa</li>
  <li><strong>Don't get too drunk</strong> - you need to be charming, not sloppy</li>
  <li><strong>Safety first</strong> - jangan biarkan drinks unattended (yours or theirs)</li>
</ol>

<blockquote>
  <p>"Confidence is attractive. Arrogance is not. Know the difference."</p>
</blockquote>

<h2>Kesimpulan</h2>
<p>PDKT di club bukan tentang pickup lines atau tricks. It's about being <strong>genuine, respectful, and reading the room</strong>. Approach dengan confidence, but always be ready to respectfully walk away.</p>

<p>Remember: Everyone is there to have fun. Be part of the fun, not the creep they'll gossip about later! 😎</p>

<p><em>Good luck, and may the vibe be with you!</em></p>
        `,
      },
      {
        title: 'Outfit Guide: Dress Code untuk Nightlife Jakarta',
        slug: 'outfit-guide-dress-code-nightlife-jakarta',
        excerpt: 'Bingung mau pakai apa ke club? Dari SCBD sampai PIK, setiap venue punya vibe berbeda. Ini dia panduan lengkap outfit untuk tiap area nightlife Jakarta.',
        featured_image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&h=600&fit=crop',
        content: `
<h2>Kenapa Outfit Matters?</h2>
<p>Di nightlife Jakarta, <strong>first impression starts dari outfit</strong>. Venue-venue premium punya dress code strict, dan bouncer bisa reject kalau tidak sesuai. Plus, outfit yang tepat boost confidence!</p>

<h2>General Rules untuk Club Jakarta</h2>

<p><strong>✅ ALWAYS ALLOWED:</strong></p>
<ul>
  <li>Kemeja (shirt) - polos atau pattern</li>
  <li>Celana panjang (chinos, jeans gelap)</li>
  <li>Dress atau skirt (untuk ladies)</li>
  <li>Sepatu tertutup (loafers, heels, sneakers bersih)</li>
  <li>Blazer atau jacket</li>
</ul>

<p><strong>❌ USUALLY NOT ALLOWED:</strong></p>
<ul>
  <li>Sandals atau flip flops</li>
  <li>Shorts (kecuali venue beach club)</li>
  <li>Kaos oblong tanpa kerah (tank tops, muscle tees)</li>
  <li>Jersey olahraga</li>
  <li>Sepatu terlalu casual (crocs, sandal gunung)</li>
  <li>Ripped jeans berlebihan</li>
</ul>

<h2>Outfit Guide by Area</h2>

<h3>🏙️ SCBD Area (Premium/High-End)</h3>
<p><strong>Vibe:</strong> Sophisticated, upscale, corporate crowd</p>
<p><strong>Venues:</strong> Fyne, TWO.FOLD, Blowfish, Cork&Screw</p>

<p><strong>For Him:</strong></p>
<ul>
  <li>✅ <strong>Top:</strong> Kemeja (button-up) atau polo shirt premium</li>
  <li>✅ <strong>Bottom:</strong> Chinos atau tailored pants (hitam/navy)</li>
  <li>✅ <strong>Shoes:</strong> Loafers, brogues, atau dress shoes</li>
  <li>✅ <strong>Extra:</strong> Blazer (big plus!), jam tangan</li>
  <li>❌ <strong>Avoid:</strong> Sneakers terlalu casual, kaos oblong</li>
</ul>

<p><strong>For Her:</strong></p>
<ul>
  <li>✅ <strong>Dress:</strong> Cocktail dress, bodycon, atau midi dress</li>
  <li>✅ <strong>Alternative:</strong> Blouse + high-waist pants/skirt</li>
  <li>✅ <strong>Shoes:</strong> Heels (stiletto, block heels)</li>
  <li>✅ <strong>Extra:</strong> Statement jewelry, clutch bag</li>
  <li>💡 <strong>Tip:</strong> Go for classy over sexy</li>
</ul>

<h3>🌴 PIK Area (Beach Club Vibes)</h3>
<p><strong>Vibe:</strong> Laid-back, tropical, beachy</p>
<p><strong>Venues:</strong> Holywings PIK, venue-venue di area PIK 2</p>

<p><strong>For Him:</strong></p>
<ul>
  <li>✅ <strong>Top:</strong> Linen shirt, casual shirt, atau polo</li>
  <li>✅ <strong>Bottom:</strong> Chinos, atau bahkan shorts (cek venue policy)</li>
  <li>✅ <strong>Shoes:</strong> Loafers, boat shoes, atau sneakers bersih</li>
  <li>✅ <strong>Vibe:</strong> Resort casual, think vacation mode</li>
</ul>

<p><strong>For Her:</strong></p>
<ul>
  <li>✅ <strong>Dress:</strong> Sundress, maxi dress, atau romper</li>
  <li>✅ <strong>Alternative:</strong> Crop top + flowy pants</li>
  <li>✅ <strong>Shoes:</strong> Wedges, flat sandals, atau heels rendah</li>
  <li>✅ <strong>Vibe:</strong> Bali vibes, flowy and breezy</li>
</ul>

<h3>🎭 Kemang Area (Eclectic/Artsy)</h3>
<p><strong>Vibe:</strong> Hipster, eclectic, creative crowd</p>
<p><strong>Venues:</strong> Cork&Screw Kemang, Bengkel, Social House</p>

<p><strong>For Him:</strong></p>
<ul>
  <li>✅ <strong>Top:</strong> Kemeja casual, atau smart casual shirt</li>
  <li>✅ <strong>Bottom:</strong> Jeans (dark/black), atau casual pants</li>
  <li>✅ <strong>Shoes:</strong> Clean sneakers, boots, atau loafers</li>
  <li>✅ <strong>Vibe:</strong> Express your style, lebih relaxed</li>
</ul>

<p><strong>For Her:</strong></p>
<ul>
  <li>✅ <strong>Style:</strong> Edgy, bohemian, atau minimalist chic</li>
  <li>✅ <strong>Options:</strong> Jumpsuit, leather jacket + jeans, atau unique dresses</li>
  <li>✅ <strong>Shoes:</strong> Boots, sneakers, atau statement heels</li>
  <li>✅ <strong>Vibe:</strong> Fashion-forward, individual style</li>
</ul>

<h2>The FOOTWEAR Dilemma</h2>

<h3>Sneakers: YES or NO?</h3>
<p>Tergantung venue dan kondisi:</p>
<ul>
  <li>✅ <strong>OK:</strong> Premium sneakers (All-white, leather, minimalist)</li>
  <li>✅ <strong>OK:</strong> High-end brands (Common Projects, Golden Goose)</li>
  <li>❌ <strong>NO:</strong> Beat-up running shoes</li>
  <li>❌ <strong>NO:</strong> Neon colors atau terlalu sporty</li>
  <li>💡 <strong>Rule:</strong> Semakin high-end venue, semakin risky pakai sneakers</li>
</ul>

<h2>Weather-Proof Your Outfit</h2>
<p>Jakarta = hot & humid, but venue = AC dingin!</p>

<p><strong>Tips:</strong></p>
<ul>
  <li>🌡️ <strong>Fabric:</strong> Pilih breathable (cotton, linen) tapi tetap classy</li>
  <li>🧊 <strong>Layer:</strong> Bawa blazer/cardigan untuk indoor AC</li>
  <li>💧 <strong>Anti-sweat:</strong> Deodorant is a must!</li>
  <li>👜 <strong>Bag:</strong> Ladies, bawa small jacket in clutch</li>
</ul>

<h2>Color Psychology</h2>

<p><strong>Black:</strong> Classic, slimming, always safe</p>
<p><strong>White:</strong> Clean, fresh, tapi risky (spills!)</p>
<p><strong>Navy/Dark Blue:</strong> Sophisticated, versatile</p>
<p><strong>Bold Colors:</strong> Stand out, confident, fun</p>
<p><strong>Metallics:</strong> Party vibes, eye-catching</p>

<blockquote>
  <p>"When in doubt, go darker. Black is your best friend at night."</p>
</blockquote>

<h2>Accessories That Elevate</h2>

<p><strong>For Him:</strong></p>
<ul>
  <li>⌚ Watch (doesn't have to be luxury, just clean)</li>
  <li>🧴 Good cologne (not overpowering!)</li>
  <li>💍 Simple rings or bracelet</li>
  <li>🕶️ Kacamata (stylish frames)</li>
</ul>

<p><strong>For Her:</strong></p>
<ul>
  <li>💍 Statement jewelry (earrings, necklace)</li>
  <li>👜 Clutch atau small crossbody</li>
  <li>💄 Bold lip color</li>
  <li>🧴 Perfume (bring travel size for touch-up)</li>
</ul>

<h2>Pro Tips dari Regulars</h2>

<ol>
  <li><strong>Call ahead</strong> - Cek Instagram venue untuk dress code updates</li>
  <li><strong>Overdress > Underdress</strong> - Better too formal than rejected</li>
  <li><strong>Comfort matters</strong> - You'll be standing/dancing for hours</li>
  <li><strong>Spare shoes</strong> - Ladies, bawa flat backup di tas</li>
  <li><strong>Test your outfit</strong> - Sit, walk, dance test di rumah</li>
  <li><strong>Weather check</strong> - Bawa payung kecil (hujan tiba-tiba)</li>
</ol>

<h2>Emergency Outfit: Always Works</h2>

<p><strong>HIM - The Failsafe:</strong></p>
<ul>
  <li>Black kemeja + black chinos + black loafers</li>
  <li>Add watch</li>
  <li>Style hair, good cologne</li>
  <li>= Works 95% of venues</li>
</ul>

<p><strong>HER - The Failsafe:</strong></p>
<ul>
  <li>Little black dress + black heels</li>
  <li>Statement jewelry</li>
  <li>Bold lip</li>
  <li>= Classic, never fails</li>
</ul>

<h2>Final Checklist Before Leaving</h2>

<p>✅ Outfit sesuai venue vibe?<br>
✅ Shoes comfortable untuk standing 4+ hours?<br>
✅ Bring jacket/cardigan for AC?<br>
✅ Phone, wallet, ID, cash?<br>
✅ Perfume/deodorant applied?<br>
✅ Hair & grooming on point?<br>
✅ Outfit tested (sit, walk, dance)?<br>
✅ Checked venue Instagram for special themes?</p>

<blockquote>
  <p>"Dress for the venue you want to go to, not the venue you're leaving from."</p>
</blockquote>

<h2>Kesimpulan</h2>
<p>Bottom line: <strong>Know your venue, dress one level up</strong>, dan prioritaskan comfort tanpa sacrifice style. Outfit yang tepat = confidence boost = better night!</p>

<p>Now go slay the Jakarta nightlife! 🔥👗👔</p>
        `,
      },
      {
        title: 'Etika Nightclub: Do\'s and Don\'ts yang Wajib Diketahui',
        slug: 'etika-nightclub-dos-and-donts',
        excerpt: 'Club bukan tempat tanpa aturan. Ada etika tidak tertulis yang membedakan regular yang respected dan yang jadi persona non grata. Pelajari do\'s and don\'ts ini.',
        featured_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop',
        content: `
<h2>Kenapa Etika Penting di Nightclub?</h2>
<p>Nightlife Jakarta punya <strong>komunitas yang tight</strong>. Word spreads fast. Reputation matters. Plus, etika yang baik = respected by bouncers, bartenders, dan fellow party-goers = better experience untuk semua!</p>

<h2>🚪 Entry Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Arrive properly dressed</strong> - cek dress code sebelumnya</li>
  <li><strong>Bring valid ID</strong> - KTP atau passport</li>
  <li><strong>Be polite to bouncers</strong> - they control your entry!</li>
  <li><strong>Have your guest list name ready</strong> - jangan bikin wait</li>
  <li><strong>Respect the line</strong> - first come, first served</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't argue dress code</strong> - bouncer's word is final</li>
  <li><strong>Don't try to skip line</strong> - unless you actually have VIP</li>
  <li><strong>Don't arrive too drunk</strong> - instant rejection</li>
  <li><strong>Don't be rude</strong> - blacklist is real</li>
  <li><strong>Don't bring large groups</strong> tanpa reservasi</li>
</ul>

<blockquote>
  <p>"Bouncer bisa jadi best friend atau worst enemy. Treat them with respect."</p>
</blockquote>

<h2>🍸 Bar & Ordering Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Tip your bartender</strong> - standard 10-20%, atau minimal Rp 20k</li>
  <li><strong>Know what you want</strong> - jangan buat bartender wait</li>
  <li><strong>Make eye contact</strong> - untuk get attention</li>
  <li><strong>Order clearly</strong> - speak up, it's loud!</li>
  <li><strong>Pay as you go</strong> - or open tab with card</li>
  <li><strong>Say please & thank you</strong> - basic courtesy</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't snap fingers</strong> - super rude!</li>
  <li><strong>Don't lean over bar</strong> - stay on customer side</li>
  <li><strong>Don't wave money</strong> - tacky and entitled</li>
  <li><strong>Don't complain about prices</strong> - you knew what you signed up for</li>
  <li><strong>Don't change order 5 times</strong> - make up your mind</li>
  <li><strong>Don't leave drinks unattended</strong> - safety risk</li>
</ul>

<h2>🕺 Dance Floor Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Dance with your space</strong> - be aware of surroundings</li>
  <li><strong>Vibe with the music</strong> - don't fight the DJ's flow</li>
  <li><strong>Help people who fall</strong> - we're all in this together</li>
  <li><strong>Take "no" gracefully</strong> - if someone declines to dance</li>
  <li><strong>Share the space</strong> - don't hog center stage</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't grind on strangers</strong> - CONSENT first!</li>
  <li><strong>Don't mosh pit</strong> - this isn't a metal concert</li>
  <li><strong>Don't spill drinks</strong> - hold them properly</li>
  <li><strong>Don't take up huge space</strong> with your group</li>
  <li><strong>Don't block traffic</strong> - people need to pass</li>
  <li><strong>Don't record people</strong> without permission</li>
</ul>

<blockquote>
  <p>"The dance floor is a shared space. Respect other people's bubbles."</p>
</blockquote>

<h2>📱 Phone & Social Media Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Ask before posting</strong> - tag orang hanya jika mereka okay</li>
  <li><strong>Keep flash photography minimal</strong> - or off</li>
  <li><strong>Use phone discreetly</strong> - quick check is okay</li>
  <li><strong>Share good moments</strong> - but live in the moment too!</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't be on phone constantly</strong> - you're missing the party</li>
  <li><strong>Don't livestream everything</strong> - some people want privacy</li>
  <li><strong>Don't post embarrassing photos</strong> of friends/strangers</li>
  <li><strong>Don't use phone flashlight</strong> - blinding people</li>
  <li><strong>Don't FaceTime in the club</strong> - seriously?</li>
</ul>

<h2>👥 Social Interaction Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Introduce yourself</strong> - be friendly and open</li>
  <li><strong>Respect personal space</strong> - especially important</li>
  <li><strong>Read body language</strong> - if someone's not interested, move on</li>
  <li><strong>Include people</strong> - don't be exclusive/cliquey</li>
  <li><strong>Compliment genuinely</strong> - not creepily</li>
  <li><strong>Take rejection well</strong> - smile and walk away</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't touch without permission</strong> - HUGE red flag</li>
  <li><strong>Don't be overly aggressive</strong> - in approach or flirting</li>
  <li><strong>Don't insult/neg</strong> - not cool, not attractive</li>
  <li><strong>Don't gossip loudly</strong> - small community, remember?</li>
  <li><strong>Don't hit on every single person</strong> - desperate vibes</li>
  <li><strong>Don't cockblock</strong> - let people talk</li>
</ul>

<h2>🚻 Bathroom Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Keep it quick</strong> - people are waiting</li>
  <li><strong>Wash your hands</strong> - please</li>
  <li><strong>Help drunk friends</strong> - hold hair, get water</li>
  <li><strong>Share products</strong> - tissues, lip gloss (sisterhood!)</li>
  <li><strong>Compliment strangers</strong> - bathroom is safe space untuk hype</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't do anything illegal</strong> - cameras exist</li>
  <li><strong>Don't have long conversations</strong> - blocking stalls</li>
  <li><strong>Don't make mess</strong> - others have to use it too</li>
  <li><strong>Don't judge</strong> - everyone's dealing with something</li>
</ul>

<h2>🎭 VIP / Table Etiquette</h2>

<h3>If You Have a Table - DO ✅</h3>
<ul>
  <li><strong>Be a good host</strong> - invite people to join</li>
  <li><strong>Tip table staff</strong> - they're serving you all night</li>
  <li><strong>Share bottles</strong> - don't be stingy</li>
  <li><strong>Keep area clean</strong> - help staff out</li>
  <li><strong>Respect VIP boundaries</strong> - don't wander to other tables</li>
</ul>

<h3>If Invited to a Table - DO ✅</h3>
<ul>
  <li><strong>Thank the host</strong> - acknowledge the invite</li>
  <li><strong>Contribute if possible</strong> - offer to buy a round</li>
  <li><strong>Don't overstay</strong> - read the room</li>
  <li><strong>Be respectful</strong> - you're a guest</li>
  <li><strong>Don't bring uninvited friends</strong> - ask first!</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't crash tables</strong> - huge violation</li>
  <li><strong>Don't take bottles</strong> - that's theft</li>
  <li><strong>Don't be entitled</strong> - it's someone else's money</li>
</ul>

<h2>🆘 Emergency & Safety Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Watch your friends' drinks</strong> - and they watch yours</li>
  <li><strong>Help people in distress</strong> - get security/medic</li>
  <li><strong>Speak up if you see something wrong</strong> - harassment, etc.</li>
  <li><strong>Don't leave friends behind</strong> - buddy system</li>
  <li><strong>Know your exits</strong> - safety first</li>
  <li><strong>Keep emergency contacts</strong> - in phone and on you</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't accept drinks from strangers</strong> - watch it being made</li>
  <li><strong>Don't leave drunk friends alone</strong> - stay together</li>
  <li><strong>Don't ignore red flags</strong> - trust your gut</li>
  <li><strong>Don't drive drunk</strong> - EVER. Use Grab/Gojek.</li>
</ul>

<blockquote>
  <p>"Your safety and others' safety > everything else. No exception."</p>
</blockquote>

<h2>💰 Money & Payment Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Split bills fairly</strong> - use split apps if needed</li>
  <li><strong>Tip service staff</strong> - bartenders, servers, coat check</li>
  <li><strong>Pay your share</strong> - don't be that person</li>
  <li><strong>Bring cash backup</strong> - some places card only, some cash only</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't "forget wallet"</strong> - plan your budget</li>
  <li><strong>Don't mooch drinks</strong> - reciprocate or buy your own</li>
  <li><strong>Don't argue bills</strong> - unless genuinely wrong</li>
  <li><strong>Don't skip out on tabs</strong> - venue will remember</li>
</ul>

<h2>🚗 Exit Etiquette</h2>

<h3>DO ✅</h3>
<ul>
  <li><strong>Plan transport beforehand</strong> - Grab, designated driver</li>
  <li><strong>Thank bouncers & staff</strong> on way out</li>
  <li><strong>Check you have everything</strong> - phone, wallet, keys, friends</li>
  <li><strong>Leave venue peacefully</strong> - don't cause scene</li>
  <li><strong>Help friends get home safe</strong> - share rides</li>
</ul>

<h3>DON'T ❌</h3>
<ul>
  <li><strong>Don't drink and drive</strong> - seriously, DON'T</li>
  <li><strong>Don't start fights on exit</strong> - just leave</li>
  <li><strong>Don't leave friends behind</strong> - buddy system to the end</li>
  <li><strong>Don't cause problems outside</strong> - reflects on venue</li>
</ul>

<h2>Kesimpulan: The Golden Rule</h2>

<blockquote>
  <p><strong>"Party like you want others to party: Respectful, fun, safe, and inclusive."</strong></p>
</blockquote>

<p>Etika nightclub boils down to: <strong>Respect people, respect space, respect the vibe</strong>. Do that, and you'll be welcomed back anywhere.</p>

<p>Remember: <em>What happens in the club might not stay in the club (social media exists), so conduct yourself accordingly!</em></p>

<h2>Quick Reference Card</h2>

<p><strong>Three Magic Words:</strong></p>
<ol>
  <li><strong>CONSENT</strong> - for everything involving others</li>
  <li><strong>RESPECT</strong> - for staff, venue, and people</li>
  <li><strong>RESPONSIBILITY</strong> - for yourself and friends</li>
</ol>

<p>Follow these, and you'll be a respected regular anywhere you go! 🎉</p>
        `,
      },
      {
        title: 'Memilih Venue yang Tepat: Panduan untuk First Date di Nightlife Jakarta',
        slug: 'memilih-venue-first-date-nightlife-jakarta',
        excerpt: 'First date di club atau bar bisa jadi ide bagus... atau disaster. Ini dia panduan memilih venue yang tepat untuk impress tanpa intimidate.',
        featured_image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop',
        content: `
<h2>First Date di Nightlife? Good Idea?</h2>
<p>Tergantung! Nightlife date bisa jadi <strong>memorable dan fun</strong>, atau awkward disaster. Kuncinya: <em>pilih venue yang tepat</em> untuk vibe yang kamu mau create.</p>

<blockquote>
  <p>"The venue sets the tone. Choose wisely, and you're already halfway to a great date."</p>
</blockquote>

<h2>🎯 Goal-Setting: Apa yang Mau Dicapai?</h2>

<p>Sebelum pilih venue, tanya diri sendiri:</p>

<p><strong>Option A: Conversation-Focused</strong></p>
<ul>
  <li>Mau kenal lebih dalam</li>
  <li>Build connection through talking</li>
  <li>See if personality click</li>
  <li>→ <em>Pilih: Lounge, rooftop bar, chill bar</em></li>
</ul>

<p><strong>Option B: Activity-Focused</strong></p>
<ul>
  <li>Break ice dengan shared experience</li>
  <li>Less pressure, more fun</li>
  <li>Lihat chemistry through vibe</li>
  <li>→ <em>Pilih: Live music venue, club dengan good DJ</em></li>
</ul>

<p><strong>Option C: Balanced</strong></p>
<ul>
  <li>Bisa ngobrol DAN party</li>
  <li>Flexible based on how it goes</li>
  <li>→ <em>Pilih: Bar dengan separate areas</em></li>
</ul>

<h2>📍 Venue Recommendations by Type</h2>

<h3>🍸 Rooftop Bars (BEST untuk First Date)</h3>

<p><strong>Why it works:</strong></p>
<ul>
  <li>✅ View = natural conversation starter</li>
  <li>✅ Romantic but not too intimate</li>
  <li>✅ Not too loud - bisa ngobrol</li>
  <li>✅ Classy atmosphere</li>
  <li>✅ Good lighting for photos (important!)</li>
</ul>

<p><strong>Best for:</strong> First date, early relationship</p>
<p><strong>Vibe:</strong> Sophisticated, relaxed, impressive</p>
<p><strong>Dress code:</strong> Smart casual</p>

<p><strong>⚠️ Watch out:</strong></p>
<ul>
  <li>Can be expensive (set budget!)</li>
  <li>Sometimes crowded on weekends</li>
  <li>Weather dependent (heat/rain)</li>
</ul>

<h3>🎵 Live Music Venues</h3>

<p><strong>Why it works:</strong></p>
<ul>
  <li>✅ Built-in entertainment</li>
  <li>✅ Less pressure to constantly talk</li>
  <li>✅ Shared experience</li>
  <li>✅ Easy to gauge music taste</li>
  <li>✅ Can dance or just listen</li>
</ul>

<p><strong>Best for:</strong> Music lovers, active dates</p>
<p><strong>Vibe:</strong> Energetic, cultural, relaxed</p>

<p><strong>⚠️ Watch out:</strong></p>
<ul>
  <li>Might be too loud untuk deep conversation</li>
  <li>Show times - datang on time</li>
  <li>Cover charge (check ahead)</li>
</ul>

<h3>🍹 Cocktail Lounges</h3>

<p><strong>Why it works:</strong></p>
<ul>
  <li>✅ Intimate setting</li>
  <li>✅ Great for conversation</li>
  <li>✅ Impressive cocktails = talking point</li>
  <li>✅ Sophisticated vibe</li>
  <li>✅ Dimmed lighting (flattering!)</li>
</ul>

<p><strong>Best for:</strong> Mature crowd, serious connection</p>
<p><strong>Vibe:</strong> Intimate, classy, focused</p>

<p><strong>⚠️ Watch out:</strong></p>
<ul>
  <li>TOO quiet might increase pressure</li>
  <li>Expensive drinks</li>
  <li>Might feel too "date-y" untuk some</li>
</ul>

<h3>🎉 Clubs (RISKY but Can Work)</h3>

<p><strong>Why it MIGHT work:</strong></p>
<ul>
  <li>✅ Fun, energetic atmosphere</li>
  <li>✅ See if party style compatible</li>
  <li>✅ Dancing = physical connection</li>
  <li>✅ Less awkward silences</li>
</ul>

<p><strong>Best for:</strong> Later dates, party people</p>
<p><strong>Vibe:</strong> High energy, bold move</p>

<p><strong>⚠️ BIG Watch outs:</strong></p>
<ul>
  <li>❌ TOO LOUD - can't talk at all</li>
  <li>❌ Crowded - might get separated</li>
  <li>❌ Other people hitting on date</li>
  <li>❌ Hard to gauge real personality</li>
  <li>❌ Safety concerns (watch drinks!)</li>
</ul>

<blockquote>
  <p>"Clubs are better for 3rd+ dates when you already know each other."</p>
</blockquote>

<h2>🚫 Venues to AVOID for First Date</h2>

<p><strong>❌ Super Loud Clubs</strong></p>
<ul>
  <li>Impossible to talk</li>
  <li>Can't get to know each other</li>
  <li>Yelling in ear = not romantic</li>
</ul>

<p><strong>❌ Ultra High-End Venues</strong></p>
<ul>
  <li>Too much pressure</li>
  <li>Expensive = expectation</li>
  <li>Might intimidate date</li>
</ul>

<p><strong>❌ Super Crowded Places</strong></p>
<ul>
  <li>Hard to move around</li>
  <li>Get separated easily</li>
  <li>Uncomfortable experience</li>
</ul>

<p><strong>❌ Places You're TOO Regular At</strong></p>
<ul>
  <li>Staff knows you too well (awkward)</li>
  <li>Might run into exes</li>
  <li>Loses special feeling</li>
</ul>

<p><strong>❌ Places with Bad Lighting</strong></p>
<ul>
  <li>Can't see each other properly</li>
  <li>No good photos</li>
  <li>Feels sketchy</li>
</ul>

<h2>📋 Venue Selection Checklist</h2>

<p>Before finalizing venue, check:</p>

<p><strong>✅ Noise Level</strong></p>
<ul>
  <li>Can you hold conversation at normal volume?</li>
  <li>Background music or full blast?</li>
</ul>

<p><strong>✅ Seating Arrangement</strong></p>
<ul>
  <li>Booth = intimate</li>
  <li>Bar stools = casual</li>
  <li>Standing only = active</li>
</ul>

<p><strong>✅ Price Range</strong></p>
<ul>
  <li>Affordable for your budget?</li>
  <li>Won't make date uncomfortable?</li>
  <li>Happy hour deals available?</li>
</ul>

<p><strong>✅ Location</strong></p>
<ul>
  <li>Easy access untuk both?</li>
  <li>Safe area untuk night time?</li>
  <li>Parking atau Grab/Gojek friendly?</li>
</ul>

<p><strong>✅ Ambiance</strong></p>
<ul>
  <li>Lighting flattering?</li>
  <li>Clean and well-maintained?</li>
  <li>Background music genre?</li>
  <li>Crowd type match your age/style?</li>
</ul>

<p><strong>✅ Timing</strong></p>
<ul>
  <li>How crowded at your planned time?</li>
  <li>Need reservation?</li>
  <li>Happy hour timing?</li>
</ul>

<h2>🎯 Timing Strategy</h2>

<h3>Best Times for First Dates:</h3>

<p><strong>🕖 7-9 PM (Early Evening)</strong></p>
<ul>
  <li>✅ Not too late (low commitment)</li>
  <li>✅ Venues less crowded</li>
  <li>✅ Easy to extend if going well</li>
  <li>✅ Natural end point (work tomorrow)</li>
</ul>

<p><strong>🕘 9-11 PM (Prime Time)</strong></p>
<ul>
  <li>✅ Good energy</li>
  <li>✅ Peak atmosphere</li>
  <li>⚠️ More crowded</li>
  <li>⚠️ Harder to get tables</li>
</ul>

<p><strong>❌ AVOID:</strong></p>
<ul>
  <li>Too early (5-6 PM) - feels like after-work drink, not date</li>
  <li>Too late (midnight+) - sends wrong message for first date</li>
</ul>

<h3>Best Days:</h3>

<p><strong>✅ Thursday</strong></p>
<ul>
  <li>Weekend vibes starting</li>
  <li>Less crowded than Fri/Sat</li>
  <li>Good energy</li>
</ul>

<p><strong>✅ Sunday</strong></p>
<ul>
  <li>Chill vibe</li>
  <li>Less pressure</li>
  <li>Good for conversation</li>
</ul>

<p><strong>⚠️ Friday/Saturday</strong></p>
<ul>
  <li>Very crowded</li>
  <li>Expensive (cover charges)</li>
  <li>Hard to get seats</li>
  <li>But: best atmosphere</li>
</ul>

<h2>💡 Pro Tips untuk Venue Success</h2>

<h3>1. Scout Ahead</h3>
<p>Visit venue beforehand:</p>
<ul>
  <li>Check actual noise level</li>
  <li>See crowd type</li>
  <li>Identify best seating areas</li>
  <li>Test lighting (for photos!)</li>
  <li>Meet staff (tip them, they'll remember)</li>
</ul>

<h3>2. Make Reservation</h3>
<ul>
  <li>Shows planning & effort</li>
  <li>Guarantees seating</li>
  <li>No awkward waiting</li>
  <li>Sometimes get better tables</li>
</ul>

<h3>3. Have Backup Plan</h3>
<p>If venue doesn't work out:</p>
<ul>
  <li>Know 2-3 alternatives nearby</li>
  <li>Be flexible and casual about switching</li>
  <li>"Hey, it's too crowded. I know a better place nearby?"</li>
</ul>

<h3>4. Positioning Matters</h3>
<p>Where to sit/stand:</p>
<ul>
  <li>✅ <strong>Corner booth</strong> - intimate, private</li>
  <li>✅ <strong>Near view</strong> - talking points</li>
  <li>✅ <strong>Away from bathroom</strong> - avoid traffic</li>
  <li>✅ <strong>Away from speakers</strong> - hear each other</li>
  <li>❌ <strong>Bar stools</strong> - too casual for first date</li>
  <li>❌ <strong>Dance floor proximity</strong> - too loud</li>
</ul>

<h3>5. Budget Smart</h3>
<ul>
  <li>Check menu prices online beforehand</li>
  <li>Look for happy hour deals</li>
  <li>Bring enough cash + card</li>
  <li>Don't order most expensive thing</li>
  <li>Be prepared to cover both (but offer split option)</li>
</ul>

<h2>🗣️ The Invitation</h2>

<p>How to suggest venue:</p>

<p><strong>✅ GOOD:</strong></p>
<ul>
  <li>"There's this cool rooftop bar with amazing view. Want to check it out Friday?"</li>
  <li>"I know a place with great live music. Are you into jazz?"</li>
  <li>"What kind of vibe do you prefer - chill lounge or energetic bar?"</li>
</ul>

<p><strong>❌ BAD:</strong></p>
<ul>
  <li>"Let's hit up [super loud club]" - no conversation possible</li>
  <li>"Where do you want to go?" - shows no planning</li>
  <li>"My friend has table at [expensive club]" - too much too soon</li>
</ul>

<h2>🚨 Red Flags to Watch</h2>

<p><strong>Venue Red Flags:</strong></p>
<ul>
  <li>❌ Staff is rude or unprofessional</li>
  <li>❌ Bathroom is disgusting</li>
  <li>❌ Feels unsafe or sketchy</li>
  <li>❌ Clientele is too rowdy</li>
  <li>❌ Your date seems uncomfortable</li>
</ul>

<p><strong>If venue isn't working:</strong></p>
<ul>
  <li>"This place is more crowded than I expected. Want to try somewhere else?"</li>
  <li>Have backup ready</li>
  <li>Don't force it</li>
</ul>

<h2>📱 Before the Date - Quick Checks</h2>

<p><strong>24 Hours Before:</strong></p>
<ul>
  <li>✅ Confirm reservation</li>
  <li>✅ Check venue Instagram (any special events?)</li>
  <li>✅ Confirm with date (time & place)</li>
  <li>✅ Check weather forecast</li>
</ul>

<p><strong>2 Hours Before:</strong></p>
<ul>
  <li>✅ Final confirmation with venue</li>
  <li>✅ Plan route & transport</li>
  <li>✅ Check if dress code still same</li>
</ul>

<h2>🎬 During the Date</h2>

<p><strong>Arrive Early (10-15 minutes):</strong></p>
<ul>
  <li>Shows respect</li>
  <li>Secure good seating</li>
  <li>Compose yourself</li>
  <li>Greet date calmly</li>
</ul>

<p><strong>Read the Room:</strong></p>
<ul>
  <li>If too loud - suggest moving</li>
  <li>If date seems bored - suggest activity change</li>
  <li>If going well - extend to another spot</li>
  <li>If not clicking - don't force it</li>
</ul>

<h2>Kesimpulan: The Perfect Formula</h2>

<blockquote>
  <p><strong>Great Venue = Good Ambiance + Conversation-Friendly + Safe + Comfortable + Memorable</strong></p>
</blockquote>

<p>Remember:</p>
<ol>
  <li><strong>The venue is the stage</strong> - you're the show</li>
  <li><strong>When in doubt</strong> - choose conversation over party</li>
  <li><strong>Safety first</strong> - yours and theirs</li>
  <li><strong>Be flexible</strong> - adapt to how it's going</li>
  <li><strong>Have fun</strong> - you're both there to enjoy!</li>
</ol>

<p>Best venue? <em>The one where both of you feel comfortable, can be yourselves, and want to see each other again.</em></p>

<p>Good luck dengan first date! May the venue vibe be with you! 🥂✨</p>
        `,
      },
    ];

    console.log('\n📝 Starting blog post seeding...\n');

    for (const post of blogPosts) {
      console.log(`   Inserting: "${post.title}"`);

      await client.query(
        `
        INSERT INTO blog_posts (
          title, 
          slug, 
          content, 
          excerpt, 
          featured_image,
          status,
          published_at,
          author_id,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          content = EXCLUDED.content,
          excerpt = EXCLUDED.excerpt,
          featured_image = EXCLUDED.featured_image,
          updated_at = NOW()
        `,
        [
          post.title,
          post.slug,
          post.content,
          post.excerpt,
          post.featured_image,
          'published',
          adminId,
        ]
      );
    }

    console.log('\n✅ Successfully seeded 5 blog posts!');
    console.log('\n📊 Summary:');
    console.log('   1. Tips Menghindari Mabuk Berat Saat Party');
    console.log('   2. Panduan PDKT di Club: 8 Tips yang Benar-Benar Work');
    console.log('   3. Outfit Guide: Dress Code untuk Nightlife Jakarta');
    console.log('   4. Etika Nightclub: Do\'s and Don\'ts yang Wajib Diketahui');
    console.log('   5. Memilih Venue untuk First Date di Nightlife Jakarta');
    console.log('\n🎉 All posts are published and live!');
    console.log('   Visit: /blog to see them\n');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the seeder
seedBlogPosts();
