import { useState } from "react"
import Layout from "../components/Layout"

const healingCategories = {
  anxiety: {
    title: "😰 Mengatasi Kecemasan & Panik",
    description: "Evidence-based strategies untuk mengelola anxiety disorder dan panic attacks",
    steps: [
      {
        title: "Pahami Neurobiologi Kecemasan",
        description: "Kecemasan adalah respons fight-or-flight yang natural tapi over-activated.",
        tips: [
          "Amygdala (alarm bell otak) bereaksi terhadap ancaman - real atau perceived",
          "Tubuh melepaskan cortisol & adrenaline - ini FISIK, bukan mental weakness",
          "Hyperventilation = CO2 drop = dizziness, numbness (bukan serangan jantung)",
        ]
      },
      {
        title: "Teknik Breathing & Grounding Instant",
        description: "Immediate techniques untuk meredakan panic attack dalam 5-15 menit.",
        tips: [
          "Box Breathing: Tarik 4 detik, tahan 4, hembuskan 4, tahan 4 (repeat 5-10x)",
          "5-4-3-2-1 Grounding: Catat 5 lihat, 4 dengar, 3 sentuh, 2 cium, 1 rasa",
          "Progressive Muscle Relaxation: Tegang & relaks setiap grup otot 5 detik",
        ]
      },
      {
        title: "Cognitive Reframing",
        description: "Mengidentifikasi dan mengubah anxious thought patterns.",
        tips: [
          "Catastrophizing: 'Ini serangan jantung!' → 'Ini panic attack, akan hilang'",
          "Mind Reading: 'Semua jalan lihat saya' → 'Pikiran saya, bukan fakta'",
          "Uji pikiran: Apa BUKTI yang support/melawan thought ini? (Socratic questioning)",
        ]
      },
      {
        title: "Exposure Therapy (Gradual)",
        description: "Habiskan fear melalui repeated, safe exposure (key untuk anxiety)",
        tips: [
          "Buat feared situations hierarchy: mild anxiety → moderate → severe",
          "Stay dalam situasi 15-30 menit - anxiety AKAN menurun (habituation)",
          "Repeat 3-4x per minggu untuk solidify new learning di brain",
        ]
      },
      {
        title: "Lifestyle Modifications",
        description: "Faktor gaya hidup yang significantly impact anxiety levels.",
        tips: [
          "Kurangi: Caffeine (trigger anxiety), Alcohol (disrupts sleep & increases anxiety)",
          "Tingkatkan: Cardio 30 min 3x/minggu (reduces anxiety 30%), sleep 7-9 jam",
          "Limit news/social media - doomscrolling increases anxiety dramatically",
        ]
      },
      {
        title: "When Professional Help Needed",
        description: "Signs untuk consult dengan psychologist atau psychiatrist.",
        tips: [
          "Anxiety mengganggu daily functioning > 2 minggu, atau panic attacks berulang",
          "Sudah menghindari banyak situasi (avoidance memperkuat anxiety cycle)",
          "Therapy pilihan: CBT (70% effective), EMDR, ACT, atau medication + therapy",
        ]
      },
    ]
  },
  depression: {
    title: "😢 Mengatasi Depresi & Kehilangan Motivasi",
    description: "Comprehensive guide untuk pemulihan dari depression dan dark thoughts",
    steps: [
      {
        title: "Pahami Depression Sebagai Penyakit, Bukan Kelemahan",
        description: "Depression melibatkan imbalance neurotransmitter - ini medical, bukan personal failure.",
        tips: [
          "Serotonin (mood), Dopamine (motivation), Norepinephrine (energy) = LOW in depression",
          "Brain mengalami inflammation & reduced neuroplasticity - ini treatable condition",
          "5% populasi dunia punya depression - tidak ada shame/stigma",
        ]
      },
      {
        title: "Behavioral Activation - Mulai Kecil",
        description: "Action sebelum motivation - doing things WILL improve mood, bukan sebaliknya.",
        tips: [
          "Day 1-3: Mini tasks - mandi, makan, berjalan 10 menit (jangan expect big changes)",
          "Week 1-2: Add satu activity yang enjoyable (musik, game, scroll favorit app)",
          "Week 2+: Gradually tambah exercise, social time, purposeful activity",
        ]
      },
      {
        title: "Combat Negative Thought Spiral",
        description: "Depression distorts thinking - identify dan challenge cognitive distortions.",
        tips: [
          "Thought: 'Saya worthless, tidak ada harapan' → Bukti? (Usually none)",
          "Depression = liar - it tells lies tentang diri Anda dan masa depan",
          "Tercatat 3 kali Anda salah dengan prediksi negatif Anda? Show brain error rate",
        ]
      },
      {
        title: "Establish Rigid Daily Structure",
        description: "Depression loves chaos - struktur membantu prevent depressive spiraling.",
        tips: [
          "Set: Wake time (7am), meal times, bedtime (consistency regulates mood & sleep)",
          "Schedule 30min meaningful activity daily (exercise, hobby, socializing, creative)",
          "Sunlight exposure 15-20 min (vitamin D, circadian rhythm regulation = crucial)",
        ]
      },
      {
        title: "Social Connection Despite Not Wanting",
        description: "Isolation amplifies depression - stay connected even when difficult.",
        tips: [
          "Kontrak: Text 1 orang daily, call 1x/minggu (start small - 5 min call ok)",
          "Jika sulit keluar rumah: Video call, online games, support group communities",
          "Tell someone Anda struggling - vulnerability creates connection yang healing",
        ]
      },
      {
        title: "Medical Options: Therapy & Medication",
        description: "Moderate-severe depression needs professional treatment, bukan willpower.",
        tips: [
          "Therapy alone: 40-50% effective | Medication alone: 50-60% | Both: 70-80%",
          "SSRIs/SNRIs adalah safe & effective (not addictive, not weakness)",
          "Takes 4-6 weeks untuk see medication effects - patience necessary",
        ]
      },
    ]
  },
  selfharm: {
    title: "🩹 Healing from Self-Harm & Suicidal Thoughts",
    description: "Support untuk berhenti dari self-injury dan manage dark thoughts safely",
    steps: [
      {
        title: "Understand Why You Self-Harm",
        description: "Self-harm isn't attempt to die - it's attempt to cope dengan emotional pain.",
        tips: [
          "Functions: emotion regulation, self-punishment, sensation-seeking, cry for help",
          "Understanding function = dapat develop healthy alternatives dengan efek sama",
          "'Urge' timbul = emotional flooding → use distress tolerance skills → emotion subsides",
        ]
      },
      {
        title: "Develop Healthy Alternatives (Per Function)",
        description: "Replace self-harm dengan behavior yg give similar relief.",
        tips: [
          "Sensation-seeking: Ice cube di skin, cold shower, exercise intensif, ping pong ball",
          "Anger/Tension release: Pillow punch, scream di alam, intense workout, rip kertas",
          "Emotion regulation: Music, cry, art, journaling (no judgment), social contact",
        ]
      },
      {
        title: "DBT Skills for Distress Tolerance",
        description: "Evidence-based skills untuk survive intense emotions tanpa self-harm.",
        tips: [
          "TIPP: Temperature (ice), Intense exercise, Paced breathing, Progressive relax",
          "DISTRACT: D= Different activity, I= Intense sensations, S= Soothing, T= Think, R= Relax, A= Activities",
          "SELF-SOOTHE: Use 5 senses (music, comfort item, pleasant visuals, soft textures)",
        ]
      },
      {
        title: "Safety Planning",
        description: "Concrete plan untuk ketika urge self-harm datang.",
        tips: [
          "Write: Warning signs (mood shift, body tension), coping strategies yang bantu",
          "List orang yg bisa contact + crisis hotline on speed dial",
          "Remove access ke harmful items; replace dgn safe alternatives di reach",
        ]
      },
      {
        title: "Professional Treatment",
        description: "DBT & trauma therapy paling effective untuk self-harm recovery.",
        tips: [
          "DBT = 70%+ success untuk self-harm reduction (combines therapy + skills coaching)",
          "Trauma-focused CBT jika self-harm linked ke specific trauma",
          "Medication (anti-anxiety, antidepressant) helps reduce urges & emotional pain",
        ]
      },
      {
        title: "🚨 SUICIDAL THOUGHTS = EMERGENCY",
        description: "Jika ada plan atau serious intent untuk bunuh diri - CALL NOW.",
        tips: [
          "Hubungi 119 (Indonesia), text 741741 (USA Crisis Text Line), atau go ke ER",
          "Tell trusted person immediately - jangan alone dengan pikiran ini",
          "Suicidal thoughts = treatable symptom dari depression - bukan permanent reality",
        ]
      },
    ]
  },
  bullying: {
    title: "🛡️ Pemulihan dari Bullying & Trauma Sosial",
    description: "Langkah pemulihan dari bullying dan membangun ulang self-esteem",
    steps: [
      {
        title: "Validasi bahwa Bullying = Real Harm",
        description: "Psychological harm dari bullying sama real dengan physical injury.",
        tips: [
          "Bullying causes lasting brain changes (amygdala hyperactive, prefrontal underactive)",
          "PTSD, anxiety, depression, social phobia dari bullying adalah valid medical conditions",
          "Jangan minimize dengan 'just words' atau 'kids being kids' - normalize talking about impact",
        ]
      },
      {
        title: "Jangan Blame Yourself - Responsibility Lies With Bully",
        description: "Nothing about you 'deserved' bullying atau 'caused' it.",
        tips: [
          "Bullies target difference (real atau perceived) as weakness point - bukan karena Anda salah",
          "Bullies sendiri sering punya insecurity/trauma - bukan excuse, pero understanding",
          "Your worth tidak diminish oleh bullying - Anda tetap whole person",
        ]
      },
      {
        title: "Seek Support - Break Isolation",
        description: "Ceritakan orang terpercaya - keheningan memperkuat trauma.",
        tips: [
          "Tell parent, teacher, counselor, atau trusted friend - builds safety",
          "Online communities untuk bullying survivors provides validation & shared strategies",
          "Therapy crucial untuk processing trauma safely dengan professional",
        ]
      },
      {
        title: "Set Boundaries & Create Safety",
        description: "Lindungi diri Anda dengan firm boundaries & avoidance dari bully.",
        tips: [
          "Physical: Avoid places dimana bully hangout; walk dengan teman; tell adults patrols needed",
          "Digital: Block si bully di social media; jangan respond to provocations (feeds them)",
          "Emotional: Remember their words reflect their insecurity, bukan truth tentang Anda",
        ]
      },
      {
        title: "Rebuild Self-Esteem & Identity",
        description: "Bullying damages self-image - actively rebuild confidence.",
        tips: [
          "Reconnect dengan hobi/interests yang enjoyable (bully didn't define these)",
          "Seek peer groups dengan shared values/interests - build supportive community",
          "Document positives: List strengths, accomplishments, positive feedback dari others",
        ]
      },
      {
        title: "Long-Term Healing",
        description: "Trauma dari bullying requires ongoing processing.",
        tips: [
          "Therapy (trauma-focused CBT, EMDR) for deep processing of bullying memories",
          "Practice self-compassion - treat yourself dengan kindness you'd give hurt friend",
          "Remember: Bullying scar bisa fade, Anda lebih kuat dari trauma ini",
        ]
      },
    ]
  },
  trauma: {
    title: "💔 Healing Trauma Keluarga & Abuse",
    description: "Comprehensive recovery pathway dari family trauma dan neglect/abuse",
    steps: [
      {
        title: "Identify & Name Your Trauma",
        description: "Clarity tentang apa yang terjadi adalah langkah first untuk healing.",
        tips: [
          "Types: Emotional abuse (criticism, gaslighting), physical abuse, neglect (unmet needs), enmeshment",
          "Document patterns yang Anda notice - bagaimana trauma affects relationships/self-image sekarang",
          "Journal tentang specific memories untuk process & understand impact",
        ]
      },
      {
        title: "Validate Yourself Even If Family Doesn't",
        description: "Your feelings are real dan valid - jangan tunggu family validation.",
        tips: [
          "Family mungkin deny/minimize trauma - doesn't mean it didn't happen atau wasn't harmful",
          "Anger, sadness, fear = normal reaction terhadap abuse/neglect",
          "Anda berhak untuk feel hurt bahkan jika Anda 'love' family members",
        ]
      },
      {
        title: "Set Boundaries (Modified or No Contact)",
        description: "Proteksi diri Anda dengan firm limits on family interaction.",
        tips: [
          "Low contact: Limited communication, structured visits, emotional distance",
          "No contact: Complete cessation of communication (sometimes necessary untuk healing)",
          "Boundaries = self-love, bukan rejection atau 'bad' kid behavior",
        ]
      },
      {
        title: "Therapy - Process Dengan Professional",
        description: "Family trauma runs deep - professional support accelerates healing.",
        tips: [
          "CPT (Cognitive Processing Therapy) untuk trauma processing",
          "EMDR highly effective untuk trauma memories & stuck emotions",
          "Attachment-focused therapy untuk repair dari broken family bonds",
        ]
      },
      {
        title: "Build 'Family of Choice'",
        description: "Create supportive chosen family untuk fulfill unmet emotional needs.",
        tips: [
          "Close friends dapat provide unconditional support family didn't",
          "Mentor/role model figures dapat fill parental void",
          "Healthy relationships ARE possible untuk trauma survivors",
        ]
      },
      {
        title: "Re-Parent Yourself",
        description: "Provide yourself dengan compassion, safety, unconditional support.",
        tips: [
          "Self-soothing: Comfort items, self-affirmation, gentle self-talk",
          "Meet your own needs: Advocate untuk yourself dalam relationships",
          "Celebrate self: Recognize achievements, self-worth independent ng family opinion",
        ]
      },
    ]
  },
  relationships: {
    title: "💕 Building Healthy Relationships Post-Trauma",
    description: "Develop secure attachment dan navigate relationships setelah trauma",
    steps: [
      {
        title: "Understand Your Attachment Style",
        description: "Family of origin shapes how you attach - awareness is first step.",
        tips: [
          "Secure: Comfortable dgn intimacy & independence (HEALTHY TARGET)",
          "Anxious: Fear abandonment, need reassurance, hypervigilant untuk rejection",
          "Avoidant: Uncomfortable dgn closeness, value independence extremely, dismiss feelings",
          "Disorganized: Mix anxious + avoidant (common sa trauma survivors)",
        ]
      },
      {
        title: "Recognize Red Flags vs. Green Flags",
        description: "Learn to identify healthy vs. toxic partner/relationship early.",
        tips: [
          "RED FLAGS: Controlling, manipulative, love-bombing, gaslighting, isolating, anger outbursts",
          "GREEN FLAGS: Respects boundaries, honest communication, takes accountability, supportive",
          "Trust your gut - if something feels off, it probably is",
        ]
      },
      {
        title: "Develop Assertive Communication",
        description: "Express needs & feelings clearly tanpa aggression atau passivity.",
        tips: [
          "'I' statements: 'I feel hurt ketika...' bukan 'You always...'",
          "State needs without demands: 'Aku butuh quality time' bukan 'Anda must...'",
          "Practice saying 'no' - it's ok to prioritize your needs",
        ]
      },
      {
        title: "Heal Dalam vs. Leave Relationship",
        description: "Determine apakah relationship bisa repair atau needs to end.",
        tips: [
          "Couples therapy effective jika kedua partner willing untuk work pada issues",
          "Some relationships toxic & better ended - prioritize your mental health",
          "Leaving tidak selalu 'failure' - sometimes self-preservation",
        ]
      },
      {
        title: "Develop Interdependence",
        description: "Balance antara independence & vulnerability dalam partnership.",
        tips: [
          "Maintain own identity: Friends, hobbies, goals, finances independent",
          "Partner = support system, bukan entire source ng happiness",
          "Both people grow sambil maintaining individual autonomy",
        ]
      },
      {
        title: "Self-Love as Foundation",
        description: "Cultivate strong relationship dgn diri sendiri SEBELUM ngf partner.",
        tips: [
          "Healing time alone adalah investment sa future healthy relationships",
          "Don't look untuk 'savior' dalam romantic partners - set unrealistic expectations",
          "Two whole people together = healthier relationship ng two broken pieces",
        ]
      },
    ]
  },
}

export default function Healing() {
  const [selectedCategory, setSelectedCategory] = useState("anxiety")
  const [expandedStep, setExpandedStep] = useState(0)

  const category = healingCategories[selectedCategory]

  return (
    <Layout>
      <div className="p-10 space-y-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
            🌱 Program Pemulihan Holistik
          </h1>
          <p className="text-slate-600 text-lg">
            Panduan komprehensif untuk pemulihan dari berbagai jenis trauma dan mental health challenges. 
            Setiap kategori menawarkan strategi evidence-based yang terbukti efektif.
          </p>
        </div>

        {/* CATEGORY SELECTOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(healingCategories).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedCategory(key)
                setExpandedStep(0)
              }}
              className={`p-4 rounded-2xl font-semibold transition duration-300 text-left ${
                selectedCategory === key
                  ? "bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-xl scale-105"
                  : "bg-white text-slate-800 border-2 border-slate-200 hover:border-green-400 hover:shadow-lg"
              }`}
            >
              <div className="text-xl mb-2">{value.title.split(" ")[0]}</div>
              <div className="text-sm font-medium">{value.title.split(" ").slice(1).join(" ")}</div>
            </button>
          ))}
        </div>

        {/* CATEGORY DESCRIPTION */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-green-900 mb-2">{category.title}</h2>
          <p className="text-green-800">{category.description}</p>
        </div>

        {/* STEPS */}
        <div className="space-y-4">
          {category.steps.map((step, idx) => (
            <StepCard
              key={idx}
              step={step}
              index={idx}
              isExpanded={expandedStep === idx}
              onClick={() => setExpandedStep(expandedStep === idx ? -1 : idx)}
            />
          ))}
        </div>

        {/* RESOURCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-slate-800 mb-4">🧘 Teknik Mindfulness & Grounding</h3>
            <ul className="space-y-3 text-slate-700">
              <li><strong>✓ Box Breathing:</strong> 4-4-4-4 counting untuk calm nervous system instantly</li>
              <li><strong>✓ 5-4-3-2-1 Grounding:</strong> Engage semua 5 senses untuk present moment</li>
              <li><strong>✓ Body Scan:</strong> Scan sensations tanpa judgment atau change</li>
              <li><strong>✓ Loving-Kindness Meditation:</strong> Cultivate compassion untuk self & others</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-xl font-bold text-slate-800 mb-4">📝 Journaling & Self-Reflection</h3>
            <ul className="space-y-3 text-slate-700">
              <li><strong>✓ Timeline Mapping:</strong> Document trauma chronologically untuk understand patterns</li>
              <li><strong>✓ Daily Check-in:</strong> Note emotions & triggers daily untuk self-awareness</li>
              <li><strong>✓ Gratitude Practice:</strong> 3 things grateful setiap hari (rewires brain ke positive)</li>
              <li><strong>✓ Letter Writing:</strong> Write unsent letters untuk express & process emotions safely</li>
            </ul>
          </div>
        </div>

        {/* DAILY AFFIRMATIONS */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 border-2 border-purple-300">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">💪 Affirmations untuk Healing Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Saya layak mendapatkan kebahagiaan, kedamaian, dan cinta tanpa syarat.",
              "Masa lalu saya tidak mendefinisikan masa depan saya - saya berdaya untuk berubah.",
              "Saya memiliki kekuatan untuk memilih cara merespons dan recovery saya.",
              "Setiap hari saya tumbuh lebih kuat dan lebih wise dari pengalaman saya.",
              "Harga diri saya tidak tergantung pada pendapat orang lain - saya self-determined.",
              "Saya berhak atas hubungan yang sehat, respektuoso, dan reciprocal.",
              "Trauma saya tidak mendefinisikan saya - resilience dan kekuatan saya adalah center saya.",
              "Saya berdaya untuk menulis ulang narrative hidup saya mulai sekarang.",
              "Healing adalah proses, bukan destinasi - saya patient dan kind dengan diri sendiri.",
              "Saya layak untuk healing, untuk peace, untuk semua hal baik dalam kehidupan.",
              "Saya memilih diri saya sendiri dan prioritas keselamatan mental saya - dan itu OK.",
              "Setiap step kecil menuju healing adalah victory yang valuable dan patut dirayakan.",
            ].map((affirmation, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border-l-4 border-purple-500 shadow-md hover:shadow-lg transition">
                <p className="text-purple-900 font-medium text-sm">{affirmation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CRISIS SUPPORT */}
        <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-300">
          <h2 className="text-2xl font-bold text-red-900 mb-4">🆘 Dalam Krisis atau Butuh Bantuan Sekarang</h2>
          <p className="text-red-800 mb-6 text-lg">Jika ada pikiran untuk menyakiti diri sendiri atau bunuh diri, hubungi SEKARANG juga:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg border-2 border-red-400">
              <p className="font-bold text-red-900 text-lg">Hotline Krisis 24/7</p>
              <p className="text-red-800 text-2xl font-bold mt-3">📞 119</p>
              <p className="text-sm text-red-700 mt-2">Hubungi kapan saja, tersedia 24 jam untuk support darurat</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-red-400">
              <p className="font-bold text-red-900 text-lg">Emergency Room</p>
              <p className="text-red-800 text-2xl font-bold mt-3">🏥 Rumah Sakit Terdekat</p>
              <p className="text-sm text-red-700 mt-2">Datang langsung jika immediate danger atau urgent support needed</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function StepCard({ step, index, isExpanded, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-xl transition"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Step {index + 1}: {step.title}
          </h3>
          <p className="text-slate-600 text-sm">{step.description}</p>
        </div>
        <div className="text-3xl text-green-600 ml-4 flex-shrink-0">
          {isExpanded ? "▼" : "▶"}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t-2 border-slate-200 space-y-3">
          {step.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-green-600 font-bold flex-shrink-0 text-lg">✓</span>
              <p className="text-slate-700 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
