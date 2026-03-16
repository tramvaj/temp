import Image from 'next/image';
import styles from './page.module.css';

const divider = 'https://www.figma.com/api/mcp/asset/30cc5403-1ab6-42f6-9d08-0b16aa1ba85f';
const rating = 'https://www.figma.com/api/mcp/asset/53c1ec4b-9388-4373-a066-48aa8b1e9db0';

const featuredCards = [
  {
    title: 'Colorful Dreams',
    tag: 'Original',
    subtitle: '$500',
    art: 'Abstract painting',
  },
  {
    title: 'Silent Whisper',
    tag: 'Limited Edition',
    subtitle: '$3000',
    art: 'Sculpture of a figure',
  },
  {
    title: 'Serenity in Nature',
    tag: 'Print',
    subtitle: '$800',
    art: 'Landscape painting',
  },
];

const reviews = [
  {
    name: 'Emily R.',
    text: 'Absolutely stunning pieces! They light up my home.',
  },
  {
    name: 'Tom L.',
    text: "John's work is truly inspiring and unique.",
  },
];

const socialPosts = [
  {
    imageLabel: 'New artwork in progress',
    text: 'Excited to share my new piece!',
    labels: ['#art', '#new'],
  },
  {
    imageLabel: 'Gallery opening event',
    text: 'Join me for the gallery opening next week!',
    labels: ['#gallery', '#opening'],
  },
];

function CTA({
  children,
  variant = 'outline',
}: {
  children: string;
  variant?: 'outline' | 'solid';
}) {
  return (
    <button
      type="button"
      className={variant === 'solid' ? styles.ctaPrimary : styles.ctaSecondary}
    >
      {children}
    </button>
  );
}

function CardImagePlaceholder({ className }: { className?: string }) {
  return <div className={className ?? styles.cardImage} />;
}

function Rating() {
  return (
    <Image src={rating} alt="Star rating" width={58} height={10} className={styles.rating} unoptimized />
  );
}

export default function PortfolioPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <h1>Welcome to My Artistic World</h1>
          <p>Explore my portfolio of paintings, sculptures, and more.</p>
          <div className={styles.buttonRow}>
            <button type="button" className={styles.heroButtonSecondary}>
              Learn More
            </button>
            <button type="button" className={styles.heroButtonPrimary}>
              View Gallery
            </button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <CardImagePlaceholder className={styles.heroImagePlaceholder} />
        </div>
        <img src={divider} alt="" className={styles.curve} />
      </section>

      <section className={styles.profileSection}>
        <div className={styles.profileAvatar} />
        <div className={styles.profileBody}>
          <h2>John Doe</h2>
          <div className={styles.pills}>
            <span>Artist</span>
            <span>Painter</span>
            <span>Sculptor</span>
          </div>
          <p>Discover the creative journey of John Doe.</p>
        </div>
        <div className={styles.buttonStack}>
          <CTA>Message</CTA>
          <CTA variant="solid">Follow</CTA>
        </div>
        <img src={divider} alt="" className={styles.curve} />
      </section>

      <section className={styles.productsSection}>
        <div className={styles.sectionIntro}>
          <h2>Featured Artworks</h2>
          <p>A glimpse into my latest creations.</p>
          <button type="button" className={styles.ctaPrimary}>
            See All Artworks
          </button>
        </div>

        <div className={styles.cardGrid}>
          {featuredCards.map((card) => (
            <article className={styles.productCard} key={card.title}>
              <div className={styles.cardImageWrapper}>
                <CardImagePlaceholder />
                <span className={styles.tag}>{card.tag}</span>
                <p className={styles.artworkName}>{card.art}</p>
              </div>
              <div className={styles.productBody}>
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
            </article>
          ))}
        </div>

        <img src={divider} alt="" className={styles.curve} />
      </section>

      <section className={styles.reviewsSection}>
        <div className={styles.sectionIntro}>
          <h2>What People Say</h2>
          <p>Testimonials from my collectors.</p>
        </div>
        <div className={styles.reviewsRow}>
          {reviews.map((review) => (
            <article className={styles.reviewCard} key={review.name}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewAuthor}>
                  <span className={styles.reviewAvatar} />
                  <p>{review.name}</p>
                </div>
                <Rating />
              </div>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.socialSection}>
        <div className={styles.sectionIntroCenter}>
          <h2>Latest Updates</h2>
          <p>Stay updated with my latest creations and exhibitions.</p>
        </div>

        <div className={styles.postList}>
          {socialPosts.map((post) => (
            <article className={styles.postCard} key={post.text}>
              <header className={styles.postHeader}>
                <div className={styles.reviewAuthor}>
                  <span className={styles.reviewAvatar} />
                  <p>John Doe</p>
                </div>
                <span className={styles.more}>•••</span>
              </header>

              <div className={styles.postImage}>
                <p>{post.imageLabel}</p>
                <div className={styles.dots}>
                  <span className={styles.dotActive} />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className={styles.postText}>
                <p>{post.text}</p>
                <div className={styles.postTags}>
                  {post.labels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>(c) 2023 John Doe</p>
        <p>Follow me on social media</p>
        <p>Privacy Policy</p>
      </footer>

      <a className={styles.backToHelloWorld} href="/hello-world">
        &lt;- Back to /hello-world
      </a>
    </main>
  );
}
