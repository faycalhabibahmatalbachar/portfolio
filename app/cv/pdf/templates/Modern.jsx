import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { contactItems, fmtRange, splitLines, splitTools, visibleSections } from "../shared";

// Single column, accent rule under the header, skill chips. Tech/startup profile.
export default function Modern({ data, theme, sections, design, qr }) {
  const { profile } = data;
  const { px, fs, accent, font, labels, text, muted, line } = theme;

  const H = ({ children }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: px(14), marginBottom: px(7) }}>
      <View style={{ width: 3, height: fs(11), backgroundColor: accent, marginRight: 6, borderRadius: 1 }} />
      <Text style={{ fontSize: fs(11), fontWeight: font.bold, color: text, textTransform: "uppercase", letterSpacing: 1 }}>
        {children}
      </Text>
    </View>
  );

  const Bullet = ({ children }) => (
    <View style={{ flexDirection: "row", marginBottom: px(2.5) }}>
      <Text style={{ color: accent, marginRight: 5, fontSize: fs(9.5) }}>•</Text>
      <Text style={{ flex: 1, fontSize: fs(9.5), color: text, lineHeight: 1.45 }}>{children}</Text>
    </View>
  );

  const order = visibleSections(sections, data);

  const blocks = {
    summary: () => (
      <View key="summary">
        <H>{labels.summary}</H>
        <Text style={{ fontSize: fs(9.5), color: text, lineHeight: 1.5 }}>{profile.summary}</Text>
      </View>
    ),
    experience: () => (
      <View key="experience">
        <H>{labels.experience}</H>
        {data.experience.map((exp) => (
          <View key={exp.id} wrap={false} style={{ marginBottom: px(9) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
              <Text style={{ fontSize: fs(10.5), fontWeight: font.bold, color: text }}>{exp.role}</Text>
              <Text style={{ fontSize: fs(8.5), color: muted }}>{fmtRange(exp.start, exp.end, labels)}</Text>
            </View>
            <Text style={{ fontSize: fs(9.5), color: accent, fontWeight: font.semi, marginBottom: px(3) }}>
              {exp.company}
              {exp.location ? `  ·  ${exp.location}` : ""}
            </Text>
            {exp.description ? (
              <Text style={{ fontSize: fs(9.5), color: text, lineHeight: 1.45, marginBottom: px(2) }}>{exp.description}</Text>
            ) : null}
            {splitLines(exp.achievements).map((a, i) => (
              <Bullet key={i}>{a}</Bullet>
            ))}
          </View>
        ))}
      </View>
    ),
    education: () => (
      <View key="education">
        <H>{labels.education}</H>
        {data.education.map((edu) => (
          <View key={edu.id} wrap={false} style={{ marginBottom: px(7) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
              <Text style={{ fontSize: fs(10), fontWeight: font.bold, color: text }}>{edu.degree}</Text>
              <Text style={{ fontSize: fs(8.5), color: muted }}>{fmtRange(edu.start, edu.end, labels)}</Text>
            </View>
            <Text style={{ fontSize: fs(9.5), color: muted }}>{edu.school}</Text>
            {edu.description ? (
              <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.4, marginTop: px(1) }}>{edu.description}</Text>
            ) : null}
          </View>
        ))}
      </View>
    ),
    skills: () => (
      <View key="skills">
        <H>{labels.skills}</H>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
          {data.skills.map((sk) => (
            <Text
              key={sk.id}
              style={{
                fontSize: fs(8.5),
                color: text,
                backgroundColor: "#f3f4f6",
                borderRadius: 3,
                paddingVertical: 2.5,
                paddingHorizontal: 6,
                marginRight: 4,
                marginBottom: 4,
              }}
            >
              {sk.name}
            </Text>
          ))}
        </View>
      </View>
    ),
    projects: () => (
      <View key="projects">
        <H>{labels.projects}</H>
        {data.projects.map((p) => (
          <View key={p.id} wrap={false} style={{ marginBottom: px(7) }}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(10), fontWeight: font.bold, color: text }}>{p.name}</Text>
              {splitTools(p.tools).length ? (
                <Text style={{ fontSize: fs(8), color: accent, marginLeft: 6 }}>{splitTools(p.tools).join(" · ")}</Text>
              ) : null}
            </View>
            {p.description ? (
              <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.4 }}>{p.description}</Text>
            ) : null}
            {p.link ? (
              <Link src={p.link} style={{ fontSize: fs(8), color: muted, textDecoration: "none" }}>
                {p.link}
              </Link>
            ) : null}
          </View>
        ))}
      </View>
    ),
    languages: () => (
      <View key="languages">
        <H>{labels.languages}</H>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.languages.map((l, i) => (
            <Text key={l.id} style={{ fontSize: fs(9.5), color: text, marginRight: 12 }}>
              <Text style={{ fontWeight: font.semi }}>{l.name}</Text>
              {l.level ? <Text style={{ color: muted }}> — {l.level}</Text> : null}
            </Text>
          ))}
        </View>
      </View>
    ),
    certifications: () => (
      <View key="certifications">
        <H>{labels.certifications}</H>
        {data.certifications.map((c) => (
          <View key={c.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: px(3) }}>
            <Text style={{ fontSize: fs(9.5), color: text }}>
              <Text style={{ fontWeight: font.semi }}>{c.name}</Text>
              {c.issuer ? <Text style={{ color: muted }}> — {c.issuer}</Text> : null}
            </Text>
            <Text style={{ fontSize: fs(8.5), color: muted }}>{c.year}</Text>
          </View>
        ))}
      </View>
    ),
  };

  return (
    <Page size={design.paper} style={{ fontFamily: font.family, paddingVertical: px(36), paddingHorizontal: px(42), color: text }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ fontSize: fs(22), fontWeight: font.bold, color: text, letterSpacing: 0.5 }}>{profile.fullName}</Text>
          <Text style={{ fontSize: fs(11), color: accent, fontWeight: font.semi, marginTop: px(2) }}>{profile.title}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: px(6) }}>
            {contactItems(profile).map((c, i) => (
              <Text key={i} style={{ fontSize: fs(8.5), color: muted, marginRight: 10, marginBottom: 2 }}>
                {c}
              </Text>
            ))}
          </View>
        </View>
        {design.showPhoto && profile.photo ? (
          <Image src={profile.photo} style={{ width: 64, height: 64, borderRadius: 32, objectFit: "cover" }} />
        ) : null}
        {qr ? <Image src={qr} style={{ width: 46, height: 46, marginLeft: 10 }} /> : null}
      </View>
      <View style={{ height: 2, backgroundColor: accent, marginTop: px(10), borderRadius: 1 }} />

      {order.map((key) => blocks[key]?.())}

      <Text
        fixed
        style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontSize: 7, color: "#9ca3af" }}
        render={({ pageNumber, totalPages }) => (totalPages > 1 ? `${pageNumber} / ${totalPages}` : "")}
      />
    </Page>
  );
}
