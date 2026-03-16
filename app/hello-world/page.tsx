import Image from 'next/image';
import styles from './page.module.css';

const imgFigma = 'https://www.figma.com/api/mcp/asset/290e697c-0392-411d-921f-65e910b820a2';
const imgHeroImage = 'https://www.figma.com/api/mcp/asset/05e6f7d5-32d2-48f7-a65e-3dbe805719ea';
const imgImage = 'https://www.figma.com/api/mcp/asset/7df3cafa-f352-46e1-aacc-9eb613de11fa';
const imgIcon = 'https://www.figma.com/api/mcp/asset/42aef16b-7fcf-4db9-91ae-0535347c0769';
const imgShape = 'https://www.figma.com/api/mcp/asset/79bbe71a-5d8b-4adf-b23a-80f8a14ff45c';
const imgXLogo = 'https://www.figma.com/api/mcp/asset/dd04973d-6796-4d4e-9bc3-51cad6be21b5';
const imgInstagram = 'https://www.figma.com/api/mcp/asset/96266e55-ef64-404a-bdaf-1f8f5970013f';
const imgYoutube = 'https://www.figma.com/api/mcp/asset/00ecf6a3-bba2-439b-a2fe-b3a6fed97a40';
const imgLinkedIn = 'https://www.figma.com/api/mcp/asset/d62c106d-1aa6-4c68-a15c-c105d97bce9b';

const navItems = ['Products', 'Solutions', 'Community', 'Resources', 'Pricing', 'Contact'];
const useCases = ['UI design', 'UX design', 'Wireframing', 'Diagramming', 'Brainstorming', 'Online whiteboard'];
const explore = ['Design', 'Prototyping', 'Development features', 'Design systems', 'Collaboration features', 'Design process'];
const resources = ['Blog', 'Best practices', 'Colors', 'Color wheel', 'Support', 'Developers'];

function FeatureCard() {
  return (
    <article className={styles.card}>
      <Image src={imgIcon} alt="" width={32} height={32} className={styles.cardIcon} unoptimized />
      <div>
        <h3 className={styles.cardTitle}>Title</h3>
        <p className={styles.cardText}>
          {`Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or
          even a very short story.`}
        </p>
      </div>
    </article>
  );
}

function AvatarStrip() {
  return (
    <div className={styles.avatarRow}>
      <div className={styles.avatar}>
        <Image src={imgShape} alt="" fill className={styles.avatarImage} unoptimized />
      </div>
      <div className={styles.avatar}>
        <Image src={imgShape} alt="" fill className={styles.avatarImage} unoptimized />
      </div>
      <div className={styles.avatar}>
        <Image src={imgShape} alt="" fill className={styles.avatarImage} unoptimized />
      </div>
    </div>
  );
}

function LinkList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={styles.linkList}>
      <h4 className={styles.linkListTitle}>{title}</h4>
      <ul className={styles.listItems}>
        {items.map((item) => (
          <li key={item} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HelloWorldPage() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Image src={imgFigma} alt="Figma" width={40} height={35} unoptimized />
        </div>
        <nav aria-label="Primary" className={styles.nav}>
          {navItems.map((item) => (
            <a href="/" key={item} className={styles.navPill}>
              {item}
            </a>
          ))}
        </nav>
        <div className={styles.authButtons}>
          <button type="button" className={styles.outlineButton}>
            Sign in
          </button>
          <button type="button" className={styles.solidButton}>
            Register
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <Image
          src={imgHeroImage}
          alt="Hero"
          fill
          className={styles.heroImage}
          priority
          unoptimized
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <h1>Title</h1>
          <p>Subtitle</p>
        </div>
        <div className={styles.heroButtons}>
          <button type="button" className={styles.outlineButton}>
            Button
          </button>
          <button type="button" className={styles.solidButton}>
            Button
          </button>
        </div>
      </section>

      <section className={styles.imagePanels}>
        <Image src={imgImage} alt="Image panel" className={styles.panelImage} fill unoptimized />
        <Image src={imgImage} alt="Image panel" className={styles.panelImage} fill unoptimized />
      </section>

      <section className={styles.featureSection}>
        <div>
          <h2 className={styles.sectionTitle}>Title</h2>
          <p className={styles.sectionText}>Subheading</p>
        </div>
        <div className={styles.cards}>
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
      </section>

      <section className={styles.footer}>
        <div className={styles.avatarGroup}>
          <Image src={imgFigma} alt="Figma" width={88} height={79} unoptimized />
          <AvatarStrip />
        </div>
        <div className={styles.social}>
          <Image src={imgXLogo} alt="" width={24} height={24} unoptimized />
          <Image src={imgInstagram} alt="" width={24} height={24} unoptimized />
          <Image src={imgYoutube} alt="" width={24} height={24} unoptimized />
          <Image src={imgLinkedIn} alt="" width={24} height={24} unoptimized />
        </div>
        <div className={styles.footerColumns}>
          <LinkList title="Use cases" items={useCases} />
          <LinkList title="Explore" items={explore} />
          <LinkList title="Resources" items={resources} />
        </div>
        <div className={styles.pageLinks}>
          <a className={styles.backLink} href="/">
            Back to existing app
          </a>
          <a className={styles.backLink} href="/hello-world/switch">
            Open switch demo
          </a>
        </div>
      </section>
    </main>
  );
}
