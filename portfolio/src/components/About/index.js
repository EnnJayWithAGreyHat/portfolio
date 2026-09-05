import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Loader from 'react-loaders'

import './index.scss'
import orangeBelt from '../../assets/images/WHENORANGE.png'
import yellowBelt from '../../assets/images/WHENYELLOW.png'
import yellow1 from '../../assets/images/Yellow1.png'
import yellow2 from '../../assets/images/Yellow2.png'
import yellow3 from '../../assets/images/Yellow3.png'
import yellow4 from '../../assets/images/Yellow4.png'
import yellow5 from '../../assets/images/Yellow5.png'

import fullscreen from '../../assets/images/FULLSCREEN.png'
import ResumeCyber from './../../assets/documents/Nathan_Svoboda_Resume_Cybersecurity.pdf'
import ResumeSoft from '../../assets/documents/Nathan_Svoboda_Resume_Software.pdf'
import orange1 from '../../assets/images/Orange1.png'
import orange2 from '../../assets/images/Orange2.png'
import orange3 from '../../assets/images/Orange3.png'
import orange4 from '../../assets/images/Orange4.png'
import orange5 from '../../assets/images/Orange5.png'
import orange6 from '../../assets/images/Orange6.png'
import orange7 from '../../assets/images/Orange7.png'

const THESIS_VIDEO_ID = 'yOVDmMXggU4'

const thesisVideo = {
  url: 'https://youtu.be/yOVDmMXggU4',
  embedUrl: `https://www.youtube-nocookie.com/embed/${THESIS_VIDEO_ID}`,
  title: 'Thesis Project demo preview',
  description:
    'A short demo preview for the thesis project, showing the AI-driven creator platform, business automation workflow, and voice/telephony direction behind MyShortBIZ.',
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

const milestones = [
  {
    slug: 'yellow-belt-completion',
    title: 'Yellow Belt Completion',
    eyebrow: 'pwn.college milestone',
    status: 'Completed',
    theme: 'yellow',
    previewImage: yellowBelt,
    previewAlt: 'Yellow belt badge',
    heroImage: yellowBelt,
    heroAlt: 'Yellow belt badge',
    heroCaption: 'The yellow belt badge that marks completion of the pwn.college yellow belt material.',
    excerpt:
      'A program security milestone covering program security, advanced reverse engineering, return oriented programming, dynamic allocator misuse, and capstone program exploitation challenges.',
    sections: [
      {
        paragraphs: [
          "I'm excited to share that I have earned my yellow belt on pwn.college! This badge represents another major step in my journey to learn cybersecurity at a deeper systems level. Where the orange belt introduced me to a wide range of offensive security concepts, the yellow belt pushed me further into program security, low-level exploitation, and the kind of careful debugging that is required when the target is no longer obvious from the surface.",
          'This belt was full of challenges that required me to slow down, read carefully, and build a plan before trying to exploit anything. I learned more about how compiled programs behave, how memory corruption can be shaped into control, and how small assumptions about state, layout, or execution order can completely change the path to a working solution.',
        ],
      },
      {
        image: yellow1,
        imageAlt: 'Yellow belt program security module completion',
        paragraphs: [
          'The first major focus of the yellow belt material was program security, as seen above. This module helped establish the mindset for the rest of the belt by making me reason about how programs fail when inputs, memory, and assumptions are handled incorrectly. Instead of only thinking about whether a program worked normally, I had to think about what would happen when it was pushed outside of the path the programmer expected.',
          'At the beginning of this module, there were challenges regarding shortening your shellcode, starting with any size being allowed and shrinking to only 6 bytes. This challenge required a careful living off the land approach, and forced me to understand better how registers work and interact with each other. Next, there were a set of challenges overwriting the GOT and PLT to manipulate addresses that would point to win functions or shellcode. After that, there were the complex corruption challenges, which forced me to set certain variables of strcopy and a loop to correctly to leak information and run shellcode.',
        ],
      },
      {
        image: yellow2,
        imageAlt: 'Yellow belt reverse engineering module completion',
        paragraphs: [
          "Advanced reverse engineering was the next major focus of the yellow belt. I spent time working through Yan85-style challenges, where the architecture itself could be part of the problem and familiar instruction names were not always available. This forced me to stop relying on recognition alone and instead reason from behavior, mapping out custom instructions, syscall behavior, and the execution model piece by piece.",
          "Those challenges strengthened the same habits that orange belt started building, but at a much more precise level. The challenges evolved from me mapping the optcodes, syscalls, and register values from direct values in the binary to writing my own shellcode by understanding the interpreter loop. The final level of yansanity was a significant challenge that forced me to creatively use exit codes to discover program behavior, and map the bytes of my shellcode on my own. It was a great lesson in reverse engineering, and taught me how to observe program behavior and use all information available to me.",
        ],
      },
      {
        image: yellow3,
        imageAlt: 'Yellow belt return oriented programming module completion',
        paragraphs: [
          'Return oriented programming was another major focus for the yellow belt. I learned how to build exploit chains from small instruction sequences that already existed inside a binary instead of injecting new code directly. That made me think much more carefully about registers, stack layout, calling conventions, stack alignment, and how each gadget affects the next step in the chain.',
          'As the challenges progressed, they forced me to be more precise with my ROP, even forcing me to brute force some bytes in order to return to libc and get the program to restart. The final challenge was a fun webserver that I could fork, and I used that ability to brute force the canary and missing libc bytes to ROP the webserver. This gave me a much better understanding of why modern mitigations change exploit strategy and why control flow is such a valuable target.',
        ],
      },
      {
        image: yellow4,
        imageAlt: 'Yellow belt dynamic allocator misuse module completion',
        paragraphs: [
          'Dynamic allocator misuse pushed me into a different part of memory corruption. Instead of focusing only on the stack, I had to reason about heap state, allocation order, freed chunks, object lifetimes, and what happens when a program trusts memory that it should no longer use. The official module focuses heavily on the glibc heap and tcache, which made allocator internals feel much more concrete than they had before.',
          'The latter half of the challenges enabled safe linking, which made doing some of the same challenges as before much more difficult. Utilizing the tcache data structure to pivot to the stack was much more difficult if the address is not the same one that is leaked. The final couple challenges in this section took advantage of the fact that if you have overlaying chunks in the tcache data structure, you can overwrite part of the table, and change properties of chunk allocations. For the final level of the section, I was able to use many heap instructions to find a stack address, heap address, undo safe linking, and pivot to the stack to write the address of my shellcode and exit. It was the most difficult challenge of the yellow belt by far, and was a very satisfying flag to get. ',
        ],
      },
      {
        image: yellow5,
        imageAlt: 'Yellow belt program exploitation module completion',
        paragraphs: [
          'The final program exploitation module brought many of these ideas together into more complete exploitation scenarios. I had to combine control-flow hijacking, shellcode reasoning, side effects, Yan85-inspired constraints, and JIT spraying concepts into challenges that felt less like isolated drills and more like multi-stage problems. The work required me to connect what I learned from program security, reverse engineering, ROP, and heap misuse instead of treating each technique as separate.',
          'That final stretch was rewarding because it demanded patience, planning, and a willingness to debug small details until the whole chain made sense. Earning the yellow belt showed me that my progress was not just about learning individual techniques; it was about becoming more systematic. I left the journey with stronger reverse engineering instincts, better exploit development habits, and a clearer appreciation for the defensive value of memory safety, isolation, and careful system design.',
        ],
      },
    ],
  },
  {
    slug: 'orange-belt-completion',
    title: 'Orange Belt Completion',
    eyebrow: 'pwn.college milestone',
    status: 'Completed',
    theme: 'orange',
    previewImage: orangeBelt,
    previewAlt: 'Orange belt completion badge',
    heroImage: orangeBelt,
    heroAlt: 'Orange belt completion badge',
    heroCaption: 'The orange belt badge that marks completion of the pwn.college orange belt material.',
    excerpt:
      'A cybersecurity milestone covering web security, networking, cryptography, access control, reverse engineering, binary exploitation, and integrated security challenges.',
    sections: [
      {
        paragraphs: [
          "I'm excited to share that I have earned my orange belt on pwn.college! This badge is a significant milestone in my quest to learn more about cybersecurity, networking, and ultimately the way that computers work. This belt is full of intense and interesting challenges in a variety of areas regarding offensive security, and taught me not only about techniques to exploit a system, but a new way of thinking and approaching complicated problems.",
        ],
      },
      {
        image: orange1,
        imageAlt: 'Orange belt web security module completion',
        paragraphs: [
          'The first major focus of the orange belt material is web security, as seen above. I learned about various web vulnerabilities such as path traversal, command injection, cookie stealing, SQL injection and cross-site scripting that expose unintended use of a filesystem and show that bad input sanitization can leak unintended data. On top of that, I worked to set up a successful cross-site request forgery which demonstrated the importance of web design, and exposed me to the precise nature of combining HTML and JavaScript. As the challenges progressed in each of these respective areas, they would get more complex and therefore the vulnerability would involve more intricate design. As a result, each web challenge not only taught me how to utilize these skills, but also the underlying reason as to why these attacks would work on a system and some of the practical mitigations that can be taken to avoid risk.',
        ],
      },
      {
        image: orange2,
        imageAlt: 'Orange belt networking module completion',
        paragraphs: [
          'In addition, the next set of challenges were about dealing with communication between computers through many different modern frameworks. I configured packet-filtering rules to properly set up firewalls, manually crafted IP, TCP, ARP, and ethernet packets to learn about what information these packets carry and why that matters. I also spent time exploring communication attacks, such as denial of service, man in the middle, UDP spoofing, and using Wireshark to intercept crucial information. From this I learned a lot about the importance of cryptographic protections, and what happens when protections are missing or misconfigured.',
        ],
      },
      {
        image: orange3,
        imageAlt: 'Orange belt cryptography module completion',
        paragraphs: [
          'Cryptography was another major focus for the orange belt. I learned about many different types of encryption, specifically the structure of AES-CBC and AES-ECB and how they can leak information if certain conditions are present. I also explored authentication concepts, from Diffie-Hellman, RSA signatures, SHA-256, and TLS to understand how cryptography is utilized for secure communication.',
        ],
      },
      {
        image: orange4,
        imageAlt: 'Orange belt access control module completion',
        paragraphs: [
          "Access control was another valuable lesson: understanding POSIX permissions, groups, capabilities, and broader models of permissions. Learning about discretionary vs. mandatory access control gave me the mindset to spot privilege-separation mistakes and to always be checking that programs don't have the wrong permissions by default. I practiced identifying when file ownership, setuid bits, or a service running as a privileged user create escalation paths and those exercises taught me to reason about least privilege in systems and services.",
        ],
      },
      {
        image: orange5,
        imageAlt: 'Orange belt reverse engineering module completion',
        paragraphs: [
          "Reverse engineering taught me to read software I didn't write. I inspected binary formats, mainly CIMG, an image resolution engine that required very particular input to render images. I used disassemblers and decompilers such as IDA, Ghidra, and Binary Ninja and learned how to combine static inspection with dynamic debugging to reconstruct program logic. Those challenges forced me to improve my programming, automating repetitive analysis with Python, using hex editors to massage inputs, and getting comfortable with GDB with plugins like GEF so I could trace behavior, set breakpoints, and observe how inputs transform.",
        ],
      },
      {
        image: orange6,
        imageAlt: 'Orange belt binary exploitation module completion',
        paragraphs: [
          "Binary exploitation required many binary specific skills that I had accumulated from the previous modules. I practiced memory corruption fundamentals, overflowing buffers to overwrite return addresses, building NOP sleds and injecting shellcode, and later moving to more complex exploitation techniques such as overwriting an address, setting a variable, and returning to shellcode. Furthermore, I learned why mitigations like ASLR, NX, and stack canaries matter to protect against these kinds of attacks, and why such attacks are not possible in the same way with these mitigations. Those exercises were the first time I felt low-level control over a process's execution flow and appreciated how small memory layout details determine whether an exploit works.",
        ],
      },
      {
        image: orange7,
        imageAlt: 'Orange belt integrated security module completion',
        paragraphs: [
          'Finally, the integrated security final boss challenges forced me to combine web vulnerabilities, network manipulation, cryptographic attacks, reverse engineering, and binary exploitation into semi-realistic scenarios by breaking into a simulated webserver. It began with just SQLi, then adding XSS and cookie theft, exploiting web setup mistakes to perform padding oracles on hashed chats, and using that to decrypt the flag.',
        ],
      },
      {
        image: fullscreen,
        imageAlt: 'Orange belt completion screen',
        paragraphs: [
          'Those integrated problems were the most satisfying because they demanded not only technical know-how but also planning, creativity, and an ability to debug blind, as utilizing HTML responses was the main way of determining if the code was working. It was quite exhilarating to finally get the last flag that I needed, and to see the orange belt success message, knowing that I finally completed a milestone that had eluded me for many months. This belt will serve as a reminder that it is important to finish things, even when there are challenges that may seem steep, time consuming, and contain hurdles that seem improbable, and I will continue to persevere and learn more about vulnerability research.',
        ],
      },
    ],
  },
  {
    slug: 'thesis-project',
    title: 'Thesis Project',
    eyebrow: 'Barrett Thesis Project',
    status: 'Draft',
    theme: 'ai',
    previewVariant: 'thesis-system',
    heroVariant: 'thesis-system',
    heroCaption:
      'A systems view of MyShortBIZ: creator tools, metered AI generation, billing, analytics, and a consent-first AI voice and telephony thesis workflow.',
    video: thesisVideo,
    excerpt:
      'A modern AI-development writeup for MyShortBIZ, a creator-business SaaS platform that combines AI content tools, billing, link infrastructure, and a Barrett thesis subsystem for consent-first voice automation.',
    cardDetails: [
      'React/Vite creator dashboard',
      'FastAPI backend with modular routers',
      'OpenAI, Runway, Stripe, BTCPay, and Vapi integrations',
      'AI voice cloning and telephony thesis workflow',
    ],
    sections: [
      {
        title: 'From Cybersecurity Depth to AI Product Engineering',
        paragraphs: [
          'After the orange belt work pushed me deeper into how systems break, this thesis project pushed me toward the other side of the same discipline: designing a full product where the moving parts have to cooperate reliably. MyShortBIZ became the place where I could combine software engineering, AI tooling, billing infrastructure, and human-centered safeguards into one creator-focused platform.',
          'The goal is not just to make a demo that calls an AI model. The project is structured like a real creator-business SaaS: users can authenticate, manage account state, use AI-assisted tools, track credits, and move through specialized workflows from one shared application.',
        ],
      },
      {
        title: 'What MyShortBIZ Is Building',
        paragraphs: [
          'MyShortBIZ is positioned as an all-in-one creator and small-business suite. The product direction is to reduce tool fragmentation by giving creators one account for public pages, creator profiles, link management, analytics, AI-generated marketing content, monetization, and experimental automation workflows.',
          'The creator dashboard acts as the hub. It points users toward CV tools, bio generation, short links, social copy, blog creation, video prompts, shop and store surfaces, and the thesis workflow. Some modules are production-style features, while others are intentionally early-stage placeholders for future creator tools.',
        ],
      },
      {
        title: 'Full-Stack Architecture',
        paragraphs: [
          'The frontend is organized around a React/Vite application with public marketing pages, authenticated routes, and creator-facing tools. The backend is a FastAPI service with SQLAlchemy models, SQLite persistence, and a router structure that keeps the core app stable while optional feature routers can load when their modules are available.',
          'That architecture lets the project behave less like a one-off experiment and more like a platform. Auth, pricing, payments, content, thesis, and Vapi routes sit beside optional routers for dashboard, blog, AI CV, AI bio, AI social, AI link, AI video, and video prompt building.',
        ],
        bullets: [
          'Frontend surfaces include Home, About, Features, Solutions, Pricing, Resources, Contact, and authenticated creator tools.',
          'Persistent models cover users, plans, subscriptions, credit ledgers, pages, blocks, analytics, short links, blogs, AI usage, video jobs, thesis projects, and telephony sessions.',
          'Environment-driven integrations connect OpenAI, Runway, Stripe, BTCPay, Vapi, local voice generation, and local tunneling workflows.',
        ],
      },
      {
        title: 'AI Tools as Product Features',
        paragraphs: [
          'The AI features follow a repeated product pattern instead of acting as isolated prompt wrappers. Bio, CV, social, blog, link, and video prompt tools collect structured user inputs, build prompts around those inputs, charge credits with idempotency protections, call the model or provider, log AI usage, and refund credits if generation fails.',
          'That pattern matters because it creates a foundation for billing transparency and feature metering. The project tracks token usage, model usage, estimated cost, and user-facing credit balance, which is the kind of infrastructure needed when AI features become part of a real SaaS workflow.',
        ],
      },
      {
        title: 'The Thesis Vertical Slice',
        paragraphs: [
          'The thesis subsystem is the deepest technical area of the project. It implements a guided workflow for reference audio upload, consent acknowledgment, voice profile generation, business agent configuration, Vapi phone setup, test-call review, and live browser conversation.',
          'The thesis work is built around a consent-first principle. The implementation separates browser and phone-channel workflows, includes disclosure that callers are speaking to an AI agent, persists thesis and telephony state, and uses local voice generation with cache warming, background jobs, cleanup, and health checks to improve runtime reliability.',
        ],
      },
      {
        title: 'Why This Project Matters',
        paragraphs: [
          'The most valuable part of the thesis project is the way it combines product thinking with systems engineering. It includes public-facing pages, authenticated creator workflows, billing and credits, AI usage tracking, hosted creator-page infrastructure, short-link analytics, generated content, video prompt work, and AI voice telephony.',
          'As a draft blog post, the main story is that MyShortBIZ is not just a collection of AI experiments. It is a platform-shaped application where AI tools, creator infrastructure, and a research-grade thesis workflow are being built into one coherent product direction.',
        ],
      },
    ],
  },
]

const getMilestonePath = (slug) => `/about/${slug}`

const resumeButtonHandler = (pdfUrl, filename) => {
  const link = document.createElement('a')
  link.href = pdfUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const ThesisSystemVisual = ({ compact = false }) => {
  const nodes = compact
    ? ['AI tools', 'Billing', 'Voice', 'Links']
    : ['Creator tools', 'Credit ledger', 'Voice profile', 'Telephony']

  return (
    <div
      className={cx(
        'thesis-system-visual',
        compact && 'thesis-system-visual--compact'
      )}
      role="img"
      aria-label="MyShortBIZ AI platform system map"
    >
      <div className="thesis-system-visual__shell">
        <div className="thesis-system-visual__header">
          <span>MyShortBIZ</span>
          <span>AI Stack</span>
        </div>
        <div className="thesis-system-visual__core">
          <span>FastAPI</span>
          <strong>Thesis Engine</strong>
          <span>React/Vite</span>
        </div>
        <div className="thesis-system-visual__nodes">
          {nodes.map((node) => (
            <span key={node}>{node}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const MilestonePreview = ({ milestone }) => {
  if (milestone.previewVariant === 'thesis-system') {
    return <ThesisSystemVisual compact />
  }

  return <img src={milestone.previewImage} alt={milestone.previewAlt} />
}

const MilestoneVideo = ({ video }) => (
  <section className="milestone-video" aria-label="Thesis project video preview">
    <div className="milestone-video__copy">
      <p>{video.description}</p>
      <a href={video.url} target="_blank" rel="noreferrer">
        {video.url}
      </a>
    </div>
    <div className="milestone-video__frame">
      <iframe
        src={video.embedUrl}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  </section>
)

const MilestoneHero = ({ milestone }) => {
  if (milestone.heroVariant === 'thesis-system') {
    return (
      <figure className="milestone-article__hero milestone-article__hero--visual">
        <ThesisSystemVisual />
        <figcaption>{milestone.heroCaption}</figcaption>
      </figure>
    )
  }

  return (
    <figure className="milestone-article__hero">
      <img src={milestone.heroImage} alt={milestone.heroAlt} />
      <figcaption>{milestone.heroCaption}</figcaption>
    </figure>
  )
}

const MilestonePlaceholder = ({ placeholder, imageAlt }) => (
  <div className="milestone-article__placeholder" role="img" aria-label={imageAlt}>
    <span>{placeholder.kicker}</span>
    <strong>{placeholder.title}</strong>
    <p>{placeholder.description}</p>
  </div>
)

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const t = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <div className="container about-page about-index-page">
        <header className="about-hero">
          <h1>
            <span className={letterClass}>Important</span>{' '}
            <span className={`${letterClass} _12`}>Milestones</span>
          </h1>
          <p>
            Selected achievements, technical writeups, and visible markers of progress.
          </p>
        </header>

        <section className="milestone-grid" aria-label="Milestones">
          {milestones.map((milestone) => (
            <Link
              className={cx(
                'milestone-window',
                `milestone-window--${milestone.theme || 'cyber'}`
              )}
              key={milestone.slug}
              to={getMilestonePath(milestone.slug)}
              aria-label={`Read ${milestone.title}`}
            >
              <div className="milestone-window__bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="milestone-window__media">
                <MilestonePreview milestone={milestone} />
              </div>
              <div className="milestone-window__body">
                <div className="milestone-window__meta">
                  <span>{milestone.eyebrow}</span>
                  <span>{milestone.status}</span>
                </div>
                <h2>{milestone.title}</h2>
                <p>{milestone.excerpt}</p>
                {milestone.cardDetails && (
                  <ul className="milestone-window__details">
                    {milestone.cardDetails.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
                <span className="milestone-window__link">Read milestone</span>
              </div>
            </Link>
          ))}
        </section>

        <div className="resume-actions" aria-label="Resume downloads">
          <button
            className="resume-download-b"
            onClick={() =>
              resumeButtonHandler(
                ResumeCyber,
                'Nathan-Svoboda-Resume-Cybersecurity.pdf'
              )
            }
          >
            Resume - Cybersecurity
          </button>
          <button
            className="resume-download-b"
            onClick={() =>
              resumeButtonHandler(
                ResumeSoft,
                'Nathan-Svoboda-Resume-Software.pdf'
              )
            }
          >
            Resume - Software
          </button>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export const MilestoneArticle = () => {
  const { milestoneSlug } = useParams()
  const milestone = milestones.find(({ slug }) => slug === milestoneSlug)

  if (!milestone) {
    return <Navigate to="/about" replace />
  }

  return (
    <>
      <div
        className={cx(
          'container about-page milestone-article-page',
          `about-page--${milestone.theme || 'cyber'}`
        )}
      >
        <Link className="milestone-back-link" to="/about">
          Back to milestones
        </Link>

        <article
          className={cx(
            'milestone-article',
            `milestone-article--${milestone.theme || 'cyber'}`
          )}
        >
          <header className="milestone-article__header">
            <p className="milestone-article__eyebrow">{milestone.eyebrow}</p>
            <h1>{milestone.title}</h1>
            <p className="milestone-article__dek">{milestone.excerpt}</p>
          </header>

          {milestone.video && <MilestoneVideo video={milestone.video} />}

          <MilestoneHero milestone={milestone} />

          <div className="milestone-article__content">
            {milestone.sections.map((section, sectionIndex) => (
              <section
                className="milestone-article__section"
                key={`${milestone.slug}-section-${sectionIndex}`}
              >
                {(section.image || section.placeholder) && (
                  <figure>
                    {section.image ? (
                      <img src={section.image} alt={section.imageAlt} />
                    ) : (
                      <MilestonePlaceholder
                        placeholder={section.placeholder}
                        imageAlt={section.imageAlt}
                      />
                    )}
                  </figure>
                )}
                {section.title && <h2>{section.title}</h2>}
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${milestone.slug}-${sectionIndex}-${paragraphIndex}`}>
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="milestone-article__list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
