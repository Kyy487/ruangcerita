import { useState } from "react"
import Layout from "../components/Layout"

const educationSections = [
  {
    id: 1,
    title: "Neurobiologi dari Trauma & Stress",
    content: "Ketika mengalami trauma atau stress berkepanjangan, otak mengalami perubahan struktural dan fungsional. Amygdala (pusat emosi & survival) menjadi hyperactive, sementara hippocampus (memory & context) dan prefrontal cortex (logic & decision) underactive. Ini menjelaskan mengapa trauma survivors sering mengalami flashbacks, hypervigilance, dan kesulitan berpikir rasional saat triggered. Neuroplasticity (kemampuan otak beradaptasi) adalah kabar baik - therapy seperti EMDR, CBT, dan somatic work aktif melatih ulang neural pathways ini.",
    expert: "Dr. Bessel van der Kolk, Neuroscientist",
  },
  {
    id: 2,
    title: "Attachment Theory & Early Relationships",
    content: "Bowlby & Ainsworth menemukan bahwa attachment quality dengan caregiver di infancy mempengaruhi relationship patterns selamanya. Secure attachment (responsive caregiver) menghasilkan secure adults; dismissive parenting → avoidant; unpredictable parenting → anxious; abusive parenting → disorganized. Tetapi attachment style BUKAN fixed - dengan awareness dan healthy relationships, orang bisa 'earn' secure attachment melalui therapeutic relationship dan consistent support. Self-compassion dan re-parenting practices juga highly effective.",
    expert: "Dr. John Bowlby & Mary Ainsworth, Attachment Researchers",
  },
  {
    id: 3,
    title: "Depression: More Than Sadness",
    content: "Depression adalah medical disorder involving imbalance dalam neurotransmitters (serotonin, dopamine, norepinephrine), inflammation, dan dysregulation dari HPA axis (stress response system). Ini bukan 'sadness' yang bisa cured dengan 'thinking positive' - research menunjukkan kombinasi therapy + medication paling effective (70-80% recovery rate). Brain imaging shows depressed individuals punya reduced gray matter volume di hippocampus dan prefrontal cortex. Good news: dengan treatment, brain bisa recover dan rebuild neural connections.",
    expert: "Dr. David Clark, Cognitive Neuroscientist",
  },
  {
    id: 4,
    title: "Anxiety Disorders & The Fight-or-Flight System",
    content: "Anxiety adalah hyperactive amygdala + underactive prefrontal cortex = alarm bell otak stuck 'ON'. Panic attacks happen ketika body falsely perceive threat - hyperventilation causes CO2 drop yang triggers dizziness, numbness (BUKAN jantung attack). CBT + gradual exposure therapy adalah gold standard treatment dengan 70% effectiveness rate. Mechanism: repeated, safe exposure ke feared situation causes habituation - amygdala learns threat isn't actual dan quiets down. Medication (SSRIs) also helps regulate serotonin yang dysregulated in anxiety.",
    expert: "Dr. Edna Foa, Anxiety Disorder Researcher",
  },
  {
    id: 5,
    title: "Self-Harm & Emotional Regulation",
    content: "Self-harm bukan attempt bunuh diri - ini adalah coping mechanism untuk overwhelming emotional pain. Untuk some, self-harm releases endorphins (painkillers); untuk others, it's sensation-seeking atau self-punishment. DBT (Dialectical Behavior Therapy) specifically addresses self-harm dengan teaching distress tolerance skills & emotional regulation strategies. Alternative coping behaviors (ice, intense exercise, cold water) dapat satisfy same function tanpa injury. Treatment involves identifying why self-harm developed + teaching alternatives + therapy untuk underlying trauma/pain.",
    expert: "Dr. Marsha Linehan, DBT Developer",
  },
  {
    id: 6,
    title: "Cognitive Distortions & Thought Patterns",
    content: "Cognitive distortions adalah pola pikiran error yang depresi dan anxiety amplify: catastrophizing (worst case), mind-reading (asumsi intent orang lain), generalization (satu kegagalan = total failure), black-and-white thinking (no middle ground). CBT works dengan identifying distortions, examining evidence for/against thought, then replacing dengan more balanced perspective. Neuroplasticity means dengan practice, brain dapat 'rewire' ke more adaptive thinking patterns. Mindfulness complementary - observing thoughts without buying into them reduces their power.",
    expert: "Dr. Albert Ellis, Cognitive Therapy Pioneer",
  },
  {
    id: 7,
    title: "Trauma Recovery Model: 3 Phases",
    content: "Trauma recovery researchers (Judith Herman, Bessel van der Kolk) identify 3 phases: (1) SAFETY - creating physiological dan psychological safety; (2) REMEMBRANCE & MOURNING - processing trauma memories, grieving losses; (3) RECONNECTION - rebuilding identity, relationships, meaning. Each phase takes time; no rushing. Different trauma modalities address different aspects: CBT = cognitive processing, EMDR = memory reprocessing, somatic work = body release, attachment-based therapy = relational healing. Combination approaches often most effective.",
    expert: "Dr. Judith Herman, Trauma Researcher",
  },
  {
    id: 8,
    title: "Resilience & Post-Traumatic Growth",
    content: "Resilience bukan 'bouncing back' - lebih dari itu, resilience adalah capacity untuk tolerate distress + continue living meaningfully. Post-Traumatic Growth (PTG) happens ketika orang integrate trauma experience menjadi deeper sense meaning, stronger relationships, personal strength. Protective factors: social support, self-efficacy, spirituality/meaning, cognitive flexibility, healthy coping. Research menunjukkan 50-70% trauma survivors report some form of growth. Therapy helps facilitate PTG by helping reframe trauma dari 'things happened TO me' menjadi 'what did I learn/become'.",
    expert: "Dr. Richard Tedeschi, PTG Researcher",
  },
  {
    id: 9,
    title: "The Window of Tolerance & Dysregulation",
    content: "Window of Tolerance = zone di mana nervous system berfungsi optimal - alert namun calm. Trauma survivors punya narrower window - mudah flip ke hyperarousal (panic, rage, hypervigilance) atau hypoarousal (numbness, dissociation, shutdown). Grounding techniques (5-4-3-2-1, cold water, movement) bring hyperaroused system back ke window. Stimulation (music, social connection, creativity) bring hypoaroused system back. Somatic Experiencing & sensorimotor psychotherapy specifically work dengan nervous system regulation. Understanding your window helps catch dysregulation early.",
    expert: "Dr. Dan Siegel, Neurotherapist",
  },
  {
    id: 10,
    title: "Self-Compassion vs. Self-Criticism",
    content: "Research menunjukkan self-compassion (treating yourself dgn kindness setelah failure) lebih effective untuk recovery dibanding self-criticism (harsh internal voice). Self-critical people punya hyperactive amygdala - they perceive threat even dalam neutral situations. Self-compassionate people have stronger prefrontal cortex activity - dapat observe pain without over-identifying dengan it. Kristin Neff's 3 components: (1) Self-kindness vs judgment; (2) Common humanity vs isolation; (3) Mindfulness vs over-identification. Practice via loving-kindness meditation, compassionate letter-writing, self-soothing behaviors.",
    expert: "Dr. Kristin Neff, Self-Compassion Researcher",
  },
  {
    id: 11,
    title: "Medication for Mental Health: Understanding SSRIs",
    content: "SSRIs (Selective Serotonin Reuptake Inhibitors) work dengan blocking reabsorption serotonin - leaving more available di brain. NOT 'happy pills' - mereka correct serotonin imbalance underlying depression/anxiety. Takes 4-6 weeks untuk work, requires consistent use. Myths: SSRIs aren't addictive (no withdrawal dalam true sense, taper needed), don't cause permanent changes (brain returns to baseline if stopped), bukan 'cop-out' (chemical imbalances require chemical correction, like insulin untuk diabetes). Medication works best combined dgn therapy - addresses neurochemistry while therapy addresses thoughts/behaviors/trauma.",
    expert: "Dr. Nardi, Psychiatrist",
  },
  {
    id: 12,
    title: "Mindfulness-Based Stress Reduction (MBSR)",
    content: "MBSR originally developed oleh Jon Kabat-Zinn untuk chronic pain, proven effective untuk anxiety, depression, trauma. Core practice: Observing thoughts/sensations WITHOUT judgment atau attempt to change. Over 8 weeks, brain imaging shows decreased amygdala activity, increased prefrontal cortex thickness, improved emotion regulation. Mechanism: Mindfulness creates 'space' antara stimulus dan response - moment para choose how to react. Research shows consistent practice literally thickens areas ng brain responsible untuk attention, emotional regulation, self-awareness. Even 10 minutes daily shows benefit.",
    expert: "Dr. Jon Kabat-Zinn, MBSR Founder",
  },
  {
    id: 13,
    title: "Social Connection & Mental Health",
    content: "Isolation = significant risk factor para depression, anxiety, suicide (comparable sa smoking 15 cigarettes/day). Conversely, strong relationships = protective factor para mental health. Oxytocin (bonding hormone) released during positive social interaction activates parasympathetic nervous system (calming). Vulnerable connection (sharing struggles) actually strengthens relationships paradoxically - people respect authenticity. Quality > quantity - one meaningful relationship mas beneficial kaysa many shallow ones. For trauma survivors: carefully chosen supportive relationships are essential para healing - safe attachment can rewire nervous system.",
    expert: "Dr. Brené Brown, Connection Researcher",
  },
  {
    id: 14,
    title: "Sleep & Mental Health Connection",
    content: "Sleep deprivation impairs prefrontal cortex (decision-making, impulse control) habang amplifying amygdala (fear, emotional reactivity). Chronic poor sleep linked sa depression, anxiety, impaired memory consolidation (memories stuck in limbic system, dapat't access cortex context). REM sleep crucial - processes emotional memories, consolidates learning. Sleep hygiene (consistent bedtime, dark/cool room, no screens 1 hour before) plus therapy/exercise/meditation improve sleep more effectively kaysa sedatives. 7-9 hours recommended. Sleep isn't luxury - it's foundational para mental health recovery.",
    expert: "Dr. Matthew Walker, Sleep Researcher",
  },
  {
    id: 15,
    title: "Exercise: Science-Backed Mental Health Treatment",
    content: "Exercise = most underutilized mental health intervention. Aerobic exercise 30 minutes, 3x/week reduces anxiety 30%, depression 25% - comparable sa medication para mild-moderate cases. Mechanism: Exercise increases BDNF (brain-derived neurotrophic factor - fertilizer para brain cells), increases endorphins & serotonin, promotes neurogenesis (new neuron growth). Regular exercise improves sleep, self-esteem, cognitive function. Doesn't have to be intense - consistent moderate activity (brisk walking, cycling, swimming) sufficient. Particularly effective para anxiety disorder + PTSD hypervigilance (movement regulates nervous system).",
    expert: "Dr. John Ratey, Exercise & Brain Researcher",
  },
  {
    id: 16,
    title: "Emotional Intelligence & Regulation",
    content: "Emotional Intelligence = capacity recognize, understand, manage own emotions + recognize/empathize others' emotions. High EQ correlated dgn better relationships, career success, mental health. Can be developed through practice. Components: (1) Self-awareness = noticing emotions without judgment; (2) Self-regulation = choosing responses despite emotional intensity; (3) Motivation = connecting actions sa meaning/values; (4) Empathy = understanding others' perspectives; (5) Social skills = managing relationships effectively. DBT & somatic therapies specifically teach EI skills. Journaling, therapy, mindfulness develop self-awareness → foundation para EI.",
    expert: "Dr. Daniel Goleman, Emotional Intelligence Pioneer",
  },
]

export default function Education() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
              📚 Pusat Edukasi Kesehatan Mental
            </h1>
            <p className="text-gray-700 text-xl">
              Panduan berbasis penelitian psikologi, neuroscience, dan evidence-based therapy untuk memahami 
              mental health, trauma, dan recovery.
            </p>
          </div>

          {/* INTRO BOX */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-indigo-600">
            <h2 className="text-2xl font-bold text-indigo-900 mb-3">💡 Tentang Konten Edukasi Ini</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Semua konten di bawah ditulis berdasarkan penelitian peer-reviewed dan expertise dari leading researchers dalam psychology, neuroscience, dan trauma therapy. Tujuan kami adalah mendemystify mental health, memberikan scientific context untuk experiences Anda, dan empower recovery melalui understanding.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
                <p className="font-bold text-indigo-900">🔬 Evidence-Based</p>
                <p className="text-sm text-gray-600 mt-2">Backed by peer-reviewed research & clinical studies</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
                <p className="font-bold text-indigo-900">👨‍⚕️ Expert Sourced</p>
                <p className="text-sm text-gray-600 mt-2">Written by leading researchers & clinicians</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
                <p className="font-bold text-indigo-900">📖 Accessible</p>
                <p className="text-sm text-gray-600 mt-2">Complex topics explained clearly & compassionately</p>
              </div>
            </div>
          </div>

          {/* CONTENT SECTIONS */}
          <div className="space-y-4 mb-12">
            {educationSections.map((section) => (
              <EducationCard
                key={section.id}
                section={section}
                isExpanded={expandedId === section.id}
                onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}
              />
            ))}
          </div>

          {/* KEY TAKEAWAYS */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">🎯 Key Principles untuk Recovery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Trauma Anda BUKAN kesalahan Anda - tetapi recovery Anda adalah tanggung jawab Anda.",
                "Brain Anda bersifat neuroplastik - dengan practice, dapat learn new patterns.",
                "Mencari bantuan profesional adalah tanda KEKUATAN, bukan kelemahan atau failure.",
                "Recovery bukan linear - ada ups and downs, dan itu NORMAL dan expected.",
                "Kombinasi therapy + medication (jika perlu) + lifestyle changes paling effective.",
                "Community & connection adalah medicine - isolasi memperkuat mental health struggles.",
                "Progress kecil setiap hari = transformasi besar seiring waktu (compound effect).",
                "Self-compassion dalam proses recovery lebih powerful daripada self-criticism.",
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4">
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <p className="text-white text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RESOURCES & FURTHER READING */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📖 Recommended Resources & Further Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceBox
                title="Recommended Books"
                items={[
                  '"The Body Keeps the Score" - Bessel van der Kolk (trauma neuroscience)',
                  '"Emotional Intelligence" - Daniel Goleman (emotion regulation)',
                  '"Why Zebras Don\'t Get Ulcers" - Robert Sapolsky (stress physiology)',
                  '"The Courage to Be Disliked" - Ichiro Kishimi (psychology in action)',
                  '"Permission to Feel" - Marc Brackett (emotional intelligence for teens)',
                ]}
              />
              <ResourceBox
                title="Therapy Modalities to Know"
                items={[
                  "CBT (Cognitive Behavioral Therapy) - 60-70% effective untuk anxiety/depression",
                  "EMDR (Eye Movement Desensitization & Reprocessing) - trauma processing",
                  "DBT (Dialectical Behavior Therapy) - emotional regulation, self-harm",
                  "Somatic Experiencing - nervous system & body-based trauma therapy",
                  "Attachment-Based Therapy - healing relational trauma & insecure attachment",
                ]}
              />
            </div>
          </div>

          {/* DISCLAIMER */}
          <div className="mt-8 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 text-sm text-yellow-900">
            <p className="font-bold mb-2">⚠️ IMPORTANT DISCLAIMER</p>
            <p>
              Konten edukasi ini untuk tujuan informatif dan educational SAJA - bukan pengganti untuk professional mental health consultation. 
              Jika Anda mengalami symptoms mental health yang serius, distress yang berkelanjutan, atau pikiran tentang self-harm, 
              PLEASE konsultasikan dengan licensed psychologist, psychiatrist, atau mental health professional yang qualified. 
              Dalam emergency, hubungi crisis hotline atau emergency services segera.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function EducationCard({ section, isExpanded, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border-l-4 border-indigo-600 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
            {!isExpanded && (
              <p className="text-gray-600 text-sm line-clamp-2">{section.content}</p>
            )}
          </div>
          <span className="text-2xl text-indigo-600 ml-4 flex-shrink-0">
            {isExpanded ? "▼" : "▶"}
          </span>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t-2 border-indigo-200">
            <p className="text-gray-700 leading-relaxed mb-4 text-sm">{section.content}</p>
            <div className="bg-indigo-50 p-4 rounded-lg border-l-2 border-indigo-600">
              <p className="text-sm text-indigo-900">
                <span className="font-bold">👨‍⚕️ Expert Source:</span> {section.expert}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ResourceBox({ title, items }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
      <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-green-600 font-bold flex-shrink-0">✓</span>
            <span className="text-gray-700 text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
