import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { contactItems, fmtRange, splitLines, splitTools, visibleSections } from "../shared";

// Centered serif header, thin rules, understated elegance. CEO / executive profile.
export default function Executive({ data, theme, sections, design, qr }) {
  const { profile } = data;
  const { px, fs, accent, labels, text, muted, line } = theme;

  // This template is serif by design — Lora unless the user picked a built-in.
  const family = design.font === "Times" || design.font === "Helvetica" ? design.font === "Times" ? "Times-Roman" : "Helvetica" : "Lora";
  const bold = family === "Lora" ? 700 : "bold";
  const semi = family === "Lora" ? 600 : "bold";

  const H = ({ children }) => (
    <View style={{ alignItems: "center", marginTop: px(15), marginBottom: px(8) }}>
      <Text style={{ fontSize: fs(11), fontWeight: semi, color: text, textTransform: "uppercase", letterSpacing: 3 }}>
        {children}
      </Text>
      <View style={{ width: 36, height: 1.5, backgroundColor: accent, marginTop: px(3) }} />
    </View>
  );

  const order = visibleSections(sections, data);

  const blocks = {
    summary: () => (
      <View key="summary">
        <H>{labels.summary}</H>
        <Text style={{ fontSize: fs(9.5), color: text, lineHeight: 1.6, textAlign: "center", paddingHorizontal: px(20) }}>
          {profile.summary}
        </Text>
      </View>
    ),
    experience: () => (
      <View key="experience">
        <H>{labels.experience}</H>
        {data.experience.map((exp) => (
          <View key={exp.id} wrap={false} style={{ marginBottom: px(10) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(11), fontWeight: bold, color: text }}>{exp.role}</Text>
              <Text style={{ fontSize: fs(8.5), color: muted }}>{fmtRange(exp.start, exp.end, labels)}</Text>
            </View>
            <Text style={{ fontSize: fs(9.5), color: accent, marginBottom: px(3) }}>
              {exp.company}
              {exp.location ? `,  ${exp.location}` : ""}
            </Text>
            {exp.description ? (
              <Text style={{ fontSize: fs(9.5), color: text, lineHeight: 1.5, marginBottom: px(2) }}>{exp.description}</Text>
            ) : null}
            {splitLines(exp.achievements).map((a, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: px(2.5) }}>
                <Text style={{ color: accent, marginRight: 6, fontSize: fs(9.5) }}>—</Text>
                <Text style={{ flex: 1, fontSize: fs(9.5), color: text, lineHeight: 1.5 }}>{a}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    ),
    education: () => (
      <View key="education">
        <H>{labels.education}</H>
        {data.education.map((edu) => (
          <View key={edu.id} wrap={false} style={{ marginBottom: px(7), alignItems: "center" }}>
            <Text style={{ fontSize: fs(10.5), fontWeight: bold, color: text }}>{edu.degree}</Text>
            <Text style={{ fontSize: fs(9), color: muted }}>
              {edu.school}
              {"   ·   "}
              {fmtRange(edu.start, edu.end, labels)}
            </Text>
          </View>
        ))}
      </View>
    ),
    skills: () => (
      <View key="skills">
        <H>{labels.skills}</H>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", paddingHorizontal: px(10) }}>
          {data.skills.map((sk, i) => (
            <Text key={sk.id} style={{ fontSize: fs(9.5), color: text, lineHeight: 1.7 }}>
              {sk.name}
              {i < data.skills.length - 1 ? "   ·   " : ""}
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
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(10.5), fontWeight: bold, color: text }}>{p.name}</Text>
              {splitTools(p.tools).length ? (
                <Text style={{ fontSize: fs(8), color: accent, marginLeft: 6 }}>{splitTools(p.tools).join(" · ")}</Text>
              ) : null}
            </View>
            {p.description ? (
              <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.5, textAlign: "center" }}>{p.description}</Text>
            ) : null}
            {p.link ? (
              <Link src={p.link} style={{ fontSize: fs(8), color: muted, textDecoration: "none", textAlign: "center" }}>
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
        <Text style={{ fontSize: fs(9.5), color: text, textAlign: "center" }}>
          {data.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join("   ·   ")}
        </Text>
      </View>
    ),
    certifications: () => (
      <View key="certifications">
        <H>{labels.certifications}</H>
        {data.certifications.map((c) => (
          <Text key={c.id} style={{ fontSize: fs(9.5), color: text, textAlign: "center", marginBottom: px(2) }}>
            <Text style={{ fontWeight: semi }}>{c.name}</Text>
            {c.issuer ? ` — ${c.issuer}` : ""}
            {c.year ? `, ${c.year}` : ""}
          </Text>
        ))}
      </View>
    ),
  };

  return (
    <Page size={design.paper} style={{ fontFamily: family, paddingVertical: px(38), paddingHorizontal: px(46), color: text }}>
      {/* Centered header */}
      <View style={{ alignItems: "center" }}>
        {design.showPhoto && profile.photo ? (
          <Image src={profile.photo} style={{ width: 70, height: 70, borderRadius: 35, objectFit: "cover", marginBottom: px(8) }} />
        ) : null}
        <Text style={{ fontSize: fs(24), fontWeight: bold, color: text, letterSpacing: 2, textTransform: "uppercase", textAlign: "center" }}>
          {profile.fullName}
        </Text>
        <Text style={{ fontSize: fs(10.5), color: accent, letterSpacing: 1.5, marginTop: px(3), textTransform: "uppercase" }}>
          {profile.title}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: px(7) }}>
          {contactItems(profile).map((c, i, arr) => (
            <Text key={i} style={{ fontSize: fs(8.5), color: muted, marginBottom: 2 }}>
              {c}
              {i < arr.length - 1 ? "    |    " : ""}
            </Text>
          ))}
        </View>
        <View style={{ width: "100%", height: 1, backgroundColor: line, marginTop: px(10) }} />
      </View>

      {order.map((key) => blocks[key]?.())}

      {qr ? (
        <View style={{ alignItems: "center", marginTop: px(14) }}>
          <Image src={qr} style={{ width: 44, height: 44 }} />
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
