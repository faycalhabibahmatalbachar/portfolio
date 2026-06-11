import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { fmtRange, splitLines, splitTools, visibleSections } from "../shared";

const SIDE_BG = "#f3f4f6";

// Dense one-pager: main column left, light gray sidebar right. Maximum signal per page.
export default function Compact({ data, theme, sections, design, qr }) {
  const { profile } = data;
  const { px, fs, accent, font, labels, text, muted, photoR } = theme;

  const order = visibleSections(sections, data);
  const sideKeys = ["skills", "languages", "certifications"];
  const mainOrder = order.filter((k) => !sideKeys.includes(k));
  const sideOrder = order.filter((k) => sideKeys.includes(k));

  const MainH = ({ children }) => (
    <Text
      style={{
        fontSize: fs(10.5),
        fontWeight: font.bold,
        color: accent,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        marginTop: px(11),
        marginBottom: px(5),
      }}
    >
      {children}
    </Text>
  );

  const SideH = ({ children }) => (
    <Text
      style={{
        fontSize: fs(9),
        fontWeight: font.bold,
        color: text,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginTop: px(12),
        marginBottom: px(5),
        borderBottomWidth: 1,
        borderBottomColor: accent,
        paddingBottom: px(2),
      }}
    >
      {children}
    </Text>
  );

  const mainBlocks = {
    summary: () => (
      <View key="summary">
        <MainH>{labels.summary}</MainH>
        <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.45 }}>{profile.summary}</Text>
      </View>
    ),
    experience: () => (
      <View key="experience">
        <MainH>{labels.experience}</MainH>
        {data.experience.map((exp) => (
          <View key={exp.id} wrap={false} style={{ marginBottom: px(7) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(10), fontWeight: font.bold, color: text, flex: 1, paddingRight: 8 }}>
                {exp.role}
                <Text style={{ color: muted, fontWeight: 400 }}>  ·  {exp.company}</Text>
              </Text>
              <Text style={{ fontSize: fs(8), color: muted }}>{fmtRange(exp.start, exp.end, labels)}</Text>
            </View>
            {exp.description ? (
              <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.4, marginTop: px(1.5) }}>{exp.description}</Text>
            ) : null}
            {splitLines(exp.achievements).map((a, i) => (
              <View key={i} style={{ flexDirection: "row", marginTop: px(1.5) }}>
                <Text style={{ color: accent, marginRight: 4, fontSize: fs(9) }}>•</Text>
                <Text style={{ flex: 1, fontSize: fs(9), color: text, lineHeight: 1.4 }}>{a}</Text>
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
          <View key={edu.id} wrap={false} style={{ marginBottom: px(5) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(9.5), fontWeight: font.semi, color: text }}>{edu.degree}</Text>
              <Text style={{ fontSize: fs(8), color: muted }}>{fmtRange(edu.start, edu.end, labels)}</Text>
            </View>
            <Text style={{ fontSize: fs(8.5), color: muted }}>{edu.school}</Text>
          </View>
        ))}
      </View>
    ),
    projects: () => (
      <View key="projects">
        <MainH>{labels.projects}</MainH>
        {data.projects.map((p) => (
          <View key={p.id} wrap={false} style={{ marginBottom: px(5) }}>
            <Text style={{ fontSize: fs(9.5), fontWeight: font.semi, color: text }}>
              {p.name}
              {splitTools(p.tools).length ? (
                <Text style={{ color: accent, fontWeight: 400, fontSize: fs(7.5) }}>  {splitTools(p.tools).join(" · ")}</Text>
              ) : null}
            </Text>
            {p.description ? (
              <Text style={{ fontSize: fs(8.5), color: text, lineHeight: 1.35 }}>{p.description}</Text>
            ) : null}
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

  const sideBlocks = {
    skills: () => (
      <View key="skills">
        <SideH>{labels.skills}</SideH>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.skills.map((sk) => (
            <Text
              key={sk.id}
              style={{
                fontSize: fs(8),
                color: text,
                backgroundColor: "#ffffff",
                borderRadius: 3,
                paddingVertical: 2,
                paddingHorizontal: 5,
                marginRight: 3,
                marginBottom: 3,
              }}
            >
              {sk.name}
            </Text>
          ))}
        </View>
      </View>
    ),
    languages: () => (
      <View key="languages">
        <SideH>{labels.languages}</SideH>
        {data.languages.map((l) => (
          <View key={l.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: px(2.5) }}>
            <Text style={{ fontSize: fs(8.5), color: text, fontWeight: font.semi }}>{l.name}</Text>
            <Text style={{ fontSize: fs(8), color: muted }}>{l.level}</Text>
          </View>
        ))}
      </View>
    ),
    certifications: () => (
      <View key="certifications">
        <SideH>{labels.certifications}</SideH>
        {data.certifications.map((c) => (
          <View key={c.id} style={{ marginBottom: px(3) }}>
            <Text style={{ fontSize: fs(8.5), color: text, fontWeight: font.semi }}>{c.name}</Text>
            <Text style={{ fontSize: fs(7.5), color: muted }}>{[c.issuer, c.year].filter(Boolean).join(" · ")}</Text>
          </View>
        ))}
      </View>
    ),
  };

  const contacts = [
    profile.email,
    profile.phone,
    profile.address,
    profile.website?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    profile.linkedin?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    profile.github?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
  ].filter(Boolean);

  return (
    <Page size={design.paper} style={{ fontFamily: font.family, flexDirection: "row", color: text }}>
      {/* Main column */}
      <View style={{ flex: 1, paddingVertical: px(26), paddingLeft: px(30), paddingRight: px(18) }}>
        <Text style={{ fontSize: fs(19), fontWeight: font.bold, color: text }}>{profile.fullName}</Text>
        <Text style={{ fontSize: fs(10), color: accent, fontWeight: font.semi, marginTop: px(1) }}>{profile.title}</Text>
        <View style={{ height: 1.5, backgroundColor: accent, width: 42, marginTop: px(6) }} />
        {mainOrder.map((key) => mainBlocks[key]?.())}
      </View>

      {/* Light sidebar */}
      <View style={{ width: "31%", backgroundColor: SIDE_BG, paddingVertical: px(26), paddingHorizontal: px(14) }}>
        {design.showPhoto && profile.photo ? (
          <Image
            src={profile.photo}
            style={{ width: 72, height: 72, borderRadius: photoR(72), objectFit: "cover", alignSelf: "center", marginBottom: px(10) }}
          />
        ) : null}
        <SideH>{labels.contact}</SideH>
        {contacts.map((c, i) => (
          <Text key={i} style={{ fontSize: fs(7.5), color: text, marginBottom: px(2.5), lineHeight: 1.35 }}>
            {c}
          </Text>
        ))}
        {sideOrder.map((key) => sideBlocks[key]?.())}
        {qr ? (
          <View style={{ marginTop: px(14), alignItems: "center" }}>
            <Image src={qr} style={{ width: 50, height: 50 }} />
            <Text style={{ fontSize: fs(6.5), color: muted, marginTop: px(2) }}>{labels.scanMe}</Text>
          </View>
        ) : null}
      </View>
    </Page>
  );
}
