import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { contactItems, fmtRange, splitLines, splitTools, visibleSections } from "../shared";

// Vertical timeline for career sections: accent dots on a continuous line.
export default function Timeline({ data, theme, sections, design, qr }) {
  const { profile } = data;
  const { px, fs, accent, font, labels, text, muted, line, photoR } = theme;

  const H = ({ children }) => (
    <Text
      style={{
        fontSize: fs(11),
        fontWeight: font.bold,
        color: text,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginTop: px(14),
        marginBottom: px(8),
      }}
    >
      {children}
    </Text>
  );

  // One timeline entry: dot + left rail + content block.
  const Entry = ({ title, sub, range, body, bullets, last }) => (
    <View wrap={false} style={{ flexDirection: "row" }}>
      <View style={{ width: 16, alignItems: "center" }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: accent, marginTop: px(2) }} />
        {!last ? <View style={{ width: 1.5, flex: 1, backgroundColor: line, marginTop: 2 }} /> : null}
      </View>
      <View style={{ flex: 1, paddingBottom: last ? 0 : px(10), paddingLeft: 6 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
          <Text style={{ fontSize: fs(10.5), fontWeight: font.bold, color: text }}>{title}</Text>
          <Text style={{ fontSize: fs(8.5), color: muted }}>{range}</Text>
        </View>
        {sub ? <Text style={{ fontSize: fs(9), color: accent, fontWeight: font.semi, marginTop: px(1) }}>{sub}</Text> : null}
        {body ? <Text style={{ fontSize: fs(9), color: text, lineHeight: 1.45, marginTop: px(2) }}>{body}</Text> : null}
        {(bullets || []).map((a, i) => (
          <View key={i} style={{ flexDirection: "row", marginTop: px(2) }}>
            <Text style={{ color: accent, marginRight: 4, fontSize: fs(9) }}>•</Text>
            <Text style={{ flex: 1, fontSize: fs(9), color: text, lineHeight: 1.45 }}>{a}</Text>
          </View>
        ))}
      </View>
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
        {data.experience.map((exp, i) => (
          <Entry
            key={exp.id}
            title={exp.role}
            sub={[exp.company, exp.location].filter(Boolean).join("  ·  ")}
            range={fmtRange(exp.start, exp.end, labels)}
            body={exp.description}
            bullets={splitLines(exp.achievements)}
            last={i === data.experience.length - 1}
          />
        ))}
      </View>
    ),
    education: () => (
      <View key="education">
        <H>{labels.education}</H>
        {data.education.map((edu, i) => (
          <Entry
            key={edu.id}
            title={edu.degree}
            sub={edu.school}
            range={fmtRange(edu.start, edu.end, labels)}
            body={edu.description}
            last={i === data.education.length - 1}
          />
        ))}
      </View>
    ),
    skills: () => (
      <View key="skills">
        <H>{labels.skills}</H>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.skills.map((sk) => (
            <Text
              key={sk.id}
              style={{
                fontSize: fs(8.5),
                color: text,
                borderWidth: 1,
                borderColor: line,
                borderRadius: 9,
                paddingVertical: 2.5,
                paddingHorizontal: 7,
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
        {data.projects.map((p, i) => (
          <Entry
            key={p.id}
            title={p.name}
            sub={splitTools(p.tools).join(" · ")}
            range=""
            body={p.description}
            bullets={p.link ? [p.link] : []}
            last={i === data.projects.length - 1}
          />
        ))}
      </View>
    ),
    languages: () => (
      <View key="languages">
        <H>{labels.languages}</H>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.languages.map((l) => (
            <Text key={l.id} style={{ fontSize: fs(9.5), color: text, marginRight: 14 }}>
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
    <Page size={design.paper} style={{ fontFamily: font.family, paddingVertical: px(34), paddingHorizontal: px(40), color: text }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ fontSize: fs(21), fontWeight: font.bold, color: text }}>{profile.fullName}</Text>
          <Text style={{ fontSize: fs(10.5), color: accent, fontWeight: font.semi, marginTop: px(2) }}>{profile.title}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: px(5) }}>
            {contactItems(profile).map((c, i) => (
              <Text key={i} style={{ fontSize: fs(8), color: muted, marginRight: 9, marginBottom: 2 }}>
                {c}
              </Text>
            ))}
          </View>
        </View>
        {design.showPhoto && profile.photo ? (
          <Image src={profile.photo} style={{ width: 62, height: 62, borderRadius: photoR(62), objectFit: "cover" }} />
        ) : null}
        {qr ? <Image src={qr} style={{ width: 44, height: 44, marginLeft: 10 }} /> : null}
      </View>
      <View style={{ height: 1, backgroundColor: line, marginTop: px(9) }} />

      {order.map((key) => blocks[key]?.())}

      <Text
        fixed
        style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontSize: 7, color: "#9ca3af" }}
        render={({ pageNumber, totalPages }) => (totalPages > 1 ? `${pageNumber} / ${totalPages}` : "")}
      />
    </Page>
  );
}
