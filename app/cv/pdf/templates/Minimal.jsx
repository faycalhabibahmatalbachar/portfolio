import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { contactItems, fmtRange, splitLines, splitTools, visibleSections } from "../shared";

// Editorial whitespace, hairline rules, quiet typography. Design-conscious profiles.
export default function Minimal({ data, theme, sections, design, qr }) {
  const { profile } = data;
  const { px, fs, accent, font, labels, text, muted, line, photoR } = theme;

  const H = ({ children }) => (
    <View style={{ marginTop: px(18), marginBottom: px(8), borderTopWidth: 0.75, borderTopColor: line, paddingTop: px(8) }}>
      <Text style={{ fontSize: fs(8.5), fontWeight: font.semi, color: muted, textTransform: "uppercase", letterSpacing: 2.5 }}>
        {children}
      </Text>
    </View>
  );

  const order = visibleSections(sections, data);

  const blocks = {
    summary: () => (
      <View key="summary">
        <H>{labels.summary}</H>
        <Text style={{ fontSize: fs(9.5), color: text, lineHeight: 1.6 }}>{profile.summary}</Text>
      </View>
    ),
    experience: () => (
      <View key="experience">
        <H>{labels.experience}</H>
        {data.experience.map((exp) => (
          <View key={exp.id} wrap={false} style={{ marginBottom: px(11), flexDirection: "row" }}>
            <View style={{ width: "24%", paddingRight: 10 }}>
              <Text style={{ fontSize: fs(8.5), color: muted }}>{fmtRange(exp.start, exp.end, labels)}</Text>
              {exp.location ? <Text style={{ fontSize: fs(8), color: muted, marginTop: px(1) }}>{exp.location}</Text> : null}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: fs(10.5), fontWeight: font.semi, color: text }}>{exp.role}</Text>
              <Text style={{ fontSize: fs(9), color: accent, marginTop: px(1), marginBottom: px(2.5) }}>{exp.company}</Text>
              {exp.description ? (
                <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.5, marginBottom: px(2) }}>{exp.description}</Text>
              ) : null}
              {splitLines(exp.achievements).map((a, i) => (
                <Text key={i} style={{ fontSize: fs(9), color: text, lineHeight: 1.5, marginBottom: px(1.5) }}>
                  {a}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    ),
    education: () => (
      <View key="education">
        <H>{labels.education}</H>
        {data.education.map((edu) => (
          <View key={edu.id} wrap={false} style={{ marginBottom: px(7), flexDirection: "row" }}>
            <View style={{ width: "24%", paddingRight: 10 }}>
              <Text style={{ fontSize: fs(8.5), color: muted }}>{fmtRange(edu.start, edu.end, labels)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: fs(10), fontWeight: font.semi, color: text }}>{edu.degree}</Text>
              <Text style={{ fontSize: fs(9), color: muted, marginTop: px(1) }}>{edu.school}</Text>
            </View>
          </View>
        ))}
      </View>
    ),
    skills: () => (
      <View key="skills">
        <H>{labels.skills}</H>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.skills.map((sk, i) => (
            <Text key={sk.id} style={{ fontSize: fs(9.5), color: text, lineHeight: 1.7 }}>
              {sk.name}
              {i < data.skills.length - 1 ? <Text style={{ color: muted }}>{"  /  "}</Text> : null}
            </Text>
          ))}
        </View>
      </View>
    ),
    projects: () => (
      <View key="projects">
        <H>{labels.projects}</H>
        {data.projects.map((p) => (
          <View key={p.id} wrap={false} style={{ marginBottom: px(8), flexDirection: "row" }}>
            <View style={{ width: "24%", paddingRight: 10 }}>
              {splitTools(p.tools).slice(0, 3).map((tl, i) => (
                <Text key={i} style={{ fontSize: fs(8), color: muted }}>
                  {tl}
                </Text>
              ))}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: fs(10), fontWeight: font.semi, color: text }}>{p.name}</Text>
              {p.description ? (
                <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.5, marginTop: px(1.5) }}>{p.description}</Text>
              ) : null}
              {p.link ? (
                <Link src={p.link} style={{ fontSize: fs(8), color: muted, textDecoration: "none" }}>
                  {p.link}
                </Link>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    ),
    languages: () => (
      <View key="languages">
        <H>{labels.languages}</H>
        <Text style={{ fontSize: fs(9.5), color: text }}>
          {data.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join("   /   ")}
        </Text>
      </View>
    ),
    certifications: () => (
      <View key="certifications">
        <H>{labels.certifications}</H>
        {data.certifications.map((c) => (
          <Text key={c.id} style={{ fontSize: fs(9.5), color: text, marginBottom: px(2.5) }}>
            {[c.name, c.issuer, c.year].filter(Boolean).join(" — ")}
          </Text>
        ))}
      </View>
    ),
  };

  return (
    <Page size={design.paper} style={{ fontFamily: font.family, paddingVertical: px(42), paddingHorizontal: px(48), color: text }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1, paddingRight: 14 }}>
          <Text style={{ fontSize: fs(24), fontWeight: 400, color: text, letterSpacing: 1.5 }}>{profile.fullName}</Text>
          <Text style={{ fontSize: fs(10), color: muted, marginTop: px(3), letterSpacing: 0.5 }}>{profile.title}</Text>
          <View style={{ height: 2, width: 26, backgroundColor: accent, marginTop: px(8) }} />
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: px(8) }}>
            {contactItems(profile).map((c, i, arr) => (
              <Text key={i} style={{ fontSize: fs(8), color: muted, marginBottom: 2 }}>
                {c}
                {i < arr.length - 1 ? "   ·   " : ""}
              </Text>
            ))}
          </View>
        </View>
        {design.showPhoto && profile.photo ? (
          <Image src={profile.photo} style={{ width: 58, height: 58, borderRadius: photoR(58), objectFit: "cover" }} />
        ) : null}
      </View>

      {order.map((key) => blocks[key]?.())}

      {qr ? (
        <View style={{ marginTop: px(16), alignItems: "flex-start" }}>
          <Image src={qr} style={{ width: 40, height: 40 }} />
          <Text style={{ fontSize: fs(7), color: muted, marginTop: px(2) }}>{labels.scanMe}</Text>
        </View>
      ) : null}

      <Text
        fixed
        style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontSize: 7, color: "#9ca3af" }}
        render={({ pageNumber, totalPages }) => (totalPages > 1 ? `${pageNumber} / ${totalPages}` : "")}
      />
    </Page>
  );
}
