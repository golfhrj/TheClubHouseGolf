import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

/**
 * Waitlist confirmation email.
 *
 * No logo image, by design (see the TAM Studio templates this follows the
 * lead of) - a wordmark + a gold dot survives Outlook, dark mode, and
 * "images blocked by default" without a single broken-image icon. Every
 * link is built from `siteUrl` (see src/lib/site.ts) so it automatically
 * points wherever the site is actually deployed - localhost in dev,
 * chgolfco.com in production.
 *
 * Tables and inline styles throughout (not flexbox) - Outlook renders with
 * Word's HTML engine, which supports neither.
 */
export function WaitlistConfirmationEmail({ siteUrl }: { siteUrl: string }) {
  const social = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/clubhouse-golf-co/posts/?feedView=all" },
    { label: "Instagram", href: "https://www.instagram.com/clubhousegolfco_/" },
    { label: "TikTok", href: "https://www.tiktok.com/@clubhousegolfco" },
  ];
  const year = new Date().getFullYear();

  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light only" />
      </Head>
      <Preview>You&apos;re on the Clubhouse Golf waitlist - we&apos;ll email you the moment we launch.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header - mowing-stripe fairway pattern, same as the site hero */}
          <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={styles.headerTable}>
            <tbody>
              <tr>
                <td style={styles.headerCell}>
                  <span style={styles.wordmark}>
                    CLUBHOUSE<span style={styles.wordmarkDot}>&nbsp;&#9679;&nbsp;</span>GOLF
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Body */}
          <Section style={styles.body2}>
            <table role="presentation" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: 8, verticalAlign: "middle" }}>
                    <span style={styles.statusDot} />
                  </td>
                  <td>
                    <Text style={styles.eyebrow}>REBUILDING &middot; LIVE 15 OCTOBER</Text>
                  </td>
                </tr>
              </tbody>
            </table>

            <Text style={styles.heading}>You&apos;re on the list.</Text>

            <Text style={styles.paragraph}>
              We&apos;re rebuilding Clubhouse Golf from the ground up - one storefront across
              ten partner brands, and a members&apos; app to match. You&apos;ll be the first to
              know the moment the new site goes live.
            </Text>

            <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "30px 0 28px" }}>
              <tbody>
                <tr>
                  <td style={styles.buttonCell}>
                    <Link href={siteUrl} style={styles.button}>
                      Visit Clubhouse Golf
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>

            <Hr style={styles.hr} />

            <Text style={styles.small}>
              In the meantime, follow along for live updates before launch:
            </Text>
            <Row>
              {social.map((s) => (
                <Column key={s.label} style={{ paddingRight: 20 }}>
                  <Link href={s.href} style={styles.socialLink}>
                    {s.label}
                  </Link>
                </Column>
              ))}
            </Row>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerWordmark}>CLUBHOUSE GOLF</Text>
            <Text style={styles.footerText}>&copy; {year} Clubhouse Golf. All rights reserved.</Text>
            <Text style={styles.footerText}>
              You&apos;re receiving this because you joined the waitlist at{" "}
              <Link href={siteUrl} style={styles.footerLink}>
                {siteUrl.replace(/^https?:\/\//, "")}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default WaitlistConfirmationEmail;

const GREEN = "#0B2F24";
const SAGE = "#53695C";
const IVORY = "#F5F1E7";
const GOLD = "#A97F2C";
const INK = "#1A2420";
const INK_MUTED = "#5C665F";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const stripes = `repeating-linear-gradient(115deg, ${SAGE} 0px, ${SAGE} 22px, ${GREEN} 22px, ${GREEN} 44px)`;

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#EDE7D8",
    fontFamily: SANS,
    margin: 0,
    padding: "32px 16px",
  },
  container: {
    maxWidth: "560px",
    margin: "0 auto",
    backgroundColor: IVORY,
    border: `1px solid ${GREEN}`,
  },
  headerTable: {
    backgroundColor: GREEN,
    backgroundImage: stripes,
  },
  headerCell: {
    padding: "26px 32px",
    textAlign: "center",
    backgroundColor: "rgba(11,47,24,0.5)",
  },
  wordmark: {
    color: IVORY,
    fontFamily: SERIF,
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: "2px",
  },
  wordmarkDot: {
    color: GOLD,
    fontSize: "8px",
  },
  body2: {
    padding: "36px 32px 24px",
  },
  statusDot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: GOLD,
  },
  eyebrow: {
    color: GOLD,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
    margin: 0,
  },
  heading: {
    color: GREEN,
    fontFamily: SERIF,
    fontSize: "28px",
    fontWeight: 700,
    margin: "14px 0 16px",
    lineHeight: 1.2,
  },
  paragraph: {
    color: INK,
    fontSize: "15px",
    lineHeight: 1.65,
    margin: "0 0 8px",
  },
  buttonCell: {
    backgroundColor: GREEN,
    border: `1px solid ${GREEN}`,
  },
  button: {
    display: "block",
    padding: "15px 34px",
    color: IVORY,
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    textDecoration: "none",
  },
  hr: {
    borderColor: "rgba(11,47,24,0.15)",
    margin: "24px 0",
  },
  small: {
    color: INK_MUTED,
    fontSize: "13px",
    margin: "0 0 10px",
  },
  socialLink: {
    color: GOLD,
    fontSize: "13px",
    fontWeight: 600,
    textDecoration: "none",
  },
  footer: {
    padding: "24px 32px 28px",
    borderTop: `1px solid ${GREEN}`,
    textAlign: "center",
  },
  footerWordmark: {
    color: GREEN,
    fontFamily: SERIF,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
    margin: "0 0 10px",
  },
  footerText: {
    color: INK_MUTED,
    fontSize: "12px",
    lineHeight: 1.6,
    margin: "0 0 4px",
  },
  footerLink: {
    color: INK_MUTED,
    textDecoration: "underline",
  },
};
