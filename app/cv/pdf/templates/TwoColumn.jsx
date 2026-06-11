import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { fmtRange, splitLines, splitTools, visibleSections } from "../shared";

const SIDEBAR = "#1e293b";

// Dark sidebar (photo, contact, skills, languages) + main column. Recruiter favorite.
export default function TwoColumn({ data, theme, sections, design, qr }) {
  const { profile } = data;
  const { px, fs, accent, font, labels, text, muted } = theme;

  const order = visibleSections(sections, data);
  const sideKeys = ["skills", "languages", "certifications"];
  const mainOrder = order.filter((k) => !sideKeys.includes(k));
  const sideOrder = order.filter((k) => sideKeys.includes(k));

  const SideH = ({ children }) => (
    <Text
      style={{
        fontSize: fs(9),
        fontWeight: font.bold,
        color: "#ffffff",
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginTop: px(14),
        marginBottom: px(6),
        borderBottomWidth: 1,
        borderBottomColor: accent,
        paddingBottom: px(3),
      }}
    >
      {children}
    </Text>
  );

  const MainH = ({ children }) => (
    <Text
      style={{
        fontSize: fs(11.5),
        fontWeight: font.bold,
        color: SIDEBAR,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        marginTop: px(13),
        marginBottom: px(7),
        borderBottomWidth: 1.5,
        borderBottomColor: accent,
        paddingBottom: px(3),
      }}
    >
      {children}
    </Text>
  );

  const Dots = ({ level }) => (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <View
          key={n}
          style={{
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: n <= level ? accent : "#475569",
            marginLeft: 2,
          }}
        />
      ))}
    </View>
  );

  const sideBlocks = {
    skills: () => (
      <View key="skills">
        <SideH>{labels.skills}</SideH>
        {data.skills.map((sk) => (
          <View key={sk.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: px(3.5) }}>
            <Text style={{ fontSize: fs(8.5), color: "#e2e8f0" }}>{sk.name}</Text>
            <Dots level={sk.level} />
          </View>
        ))}
      </View>
    ),
    languages: () => (
      <View key="languages">
        <SideH>{labels.languages}</SideH>
        {data.languages.map((l) => (
          <View key={l.id} style={{ marginBottom: px(3) }}>
            <Text style={{ fontSize: fs(8.5), color: "#e2e8f0", fontWeight: font.semi }}>{l.name}</Text>
            {l.level ? <Text style={{ fontSize: fs(7.5), color: "#94a3b8" }}>{l.level}</Text> : null}
          </View>
        ))}
      </View>
    ),
    certifications: () => (
      <View key="certifications">
        <SideH>{labels.certifications}</SideH>
        {data.certifications.map((c) => (
          <View key={c.id} style={{ marginBottom: px(4) }}>
            <Text style={{ fontSize: fs(8.5), color: "#e2e8f0", fontWeight: font.semi }}>{c.name}</Text>
            <Text style={{ fontSize: fs(7.5), color: "#94a3b8" }}>
              {[c.issuer, c.year].filter(Boolean).join(" · ")}
            </Text>
          </View>
        ))}
      </View>
    ),
  };

  const mainBlocks = {
    summary: () => (
      <View key="summary">
        <MainH>{labels.summary}</MainH>
        <Text style={{ fontSize: fs(9.5), color: text, lineHeight: 1.5 }}>{profile.summary}</Text>
      </View>
    ),
    experience: () => (
      <View key="experience">
        <MainH>{labels.experience}</MainH>
        {data.experience.map((exp) => (
          <View key={exp.id} wrap={false} style={{ marginBottom: px(9) }}>
            <Text style={{ fontSize: fs(10.5), fontWeight: font.bold, color: SIDEBAR }}>{exp.role}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: px(3) }}>
              <Text style={{ fontSize: fs(9), color: accent, fontWeight: font.semi }}>
                {exp.company}
                {exp.location ? `  ·  ${exp.location}` : ""}
              </Text>
              <Text style={{ fontSize: fs(8.5), color: muted }}>{fmtRange(exp.start, exp.end, labels)}</Text>
            </View>
            {exp.description ? (
              <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.45, marginBottom: px(2) }}>{exp.description}</Text>
            ) : null}
            {splitLines(exp.achievements).map((a, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: px(2.5) }}>
                <Text style={{ color: accent, marginRight: 5, fontSize: fs(9) }}>•</Text>
                <Text style={{ flex: 1, fontSize: fs(9), color: text, lineHeight: 1.45 }}>{a}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    ),
    education: () => (
      <View key="education">
        <MainH>{labels.education}</MainH>
        {data.education.map((edu) => (
          <View key={edu.id} wrap={false} style={{ marginBottom: px(7) }}>
            <Text style={{ fontSize: fs(10), fontWeight: font.bold, color: SIDEBAR }}>{edu.degree}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: fs(9), color: muted, flex: 1, paddingRight: 8 }}>{edu.school}</Text>
              <Text style={{ fontSize: fs(8.5), color: muted }}>{fmtRange(edu.start, edu.end, labels)}</Text>
            </View>
          </View>
        ))}
      </View>
    ),
    projects: () => (
      <View key="projects">
        <MainH>{labels.projects}</MainH>
        {data.projects.map((p) => (
          <View key={p.id} wrap={false} style={{ marginBottom: px(7) }}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(10), fontWeight: font.bold, color: SIDEBAR }}>{p.name}</Text>
              {splitTools(p.tools).length ? (
                <Text style={{ fontSize: fs(7.5), color: accent, marginLeft: 6 }}>{splitTools(p.tools).join(" · ")}</Text>
              ) : null}
            </View>
            {p.description ? <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.4 }}>{p.description}</Text> : null}
            {p.link ? (
              <Link src={p.link} style={{ fontSize: fs(7.5), color: muted, textDecoration: "none" }}>
                {p.link}
              </Link>
            ) : null}
          </View>
        ))}
      </View>
    ),
  };

  const contactRows = [
    profile.email,
    profile.phone,
    profile.address,
    profile.website?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    profile.linkedin?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    profile.github?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
  ].filter(Boolean);

  return (
    <Page size={design.paper} style={{ fontFamily: font.family, flexDirection: "row", color: text }}>
      {/* Sidebar */}
      <View style={{ width: "33%", backgroundColor: SIDEBAR, paddingVertical: px(30), paddingHorizontal: px(18) }}>
        {design.showPhoto && profile.photo ? (
          <Image
            src={profile.photo}
            style={{ width: 88, height: 88, borderRadius: 44, objectFit: "cover", alignSelf: "center", marginBottom: px(12), borderWidth: 2, borderColor: accent }}
          />
        ) : null}
        <SideH>{labels.contact}</SideH>
        {contactRows.map((c, i) => (
          <Text key={i} style={{ fontSize: fs(8), color: "#cbd5e1", marginBottom: px(3.5), lineHeight: 1.4 }}>
            {c}
          </Text>
        ))}
        {sideOrder.map((key) => sideBlocks[key]?.())}
        {qr ? (
          <View style={{ marginTop: px(16), alignItems: "center" }}>
            <Image src={qr} style={{ width: 56, height: 56, backgroundColor: "#ffffff", padding: 4, borderRadius: 4 }} />
            <Text style={{ fontSize: fs(7), color: "#94a3b8", marginTop: px(3) }}>{labels.scanMe}</Text>
          </View>
        ) : null}
      </View>

      {/* Main column */}
      <View style={{ flex: 1, paddingVertical: px(30), paddingHorizontal: px(24) }}>
        <Text style={{ fontSize: fs(21), fontWeight: font.bold, color: SIDEBAR, letterSpacing: 0.5 }}>{profile.fullName}</Text>
        <Text style={{ fontSize: fs(11), color: accent, fontWeight: font.semi, marginTop: px(2) }}>{profile.title}</Text>
        {mainOrder.map((key) => mainBlocks[key]?.())}
      </View>
    </Page>
  );
}
