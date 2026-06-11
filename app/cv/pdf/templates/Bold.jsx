import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { contactItems, fmtRange, splitLines, splitTools, visibleSections } from "../shared";

// Full-width accent header band, assertive section markers. High visual impact.
export default function Bold({ data, theme, sections, design, qr }) {
  const { profile } = data;
  const { px, fs, accent, font, labels, text, muted, photoR } = theme;

  const H = ({ children }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: px(14), marginBottom: px(7) }}>
      <View style={{ width: 9, height: 9, backgroundColor: accent, marginRight: 7 }} />
      <Text style={{ fontSize: fs(11.5), fontWeight: font.bold, color: text, textTransform: "uppercase", letterSpacing: 1.3 }}>
        {children}
      </Text>
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
          <View key={exp.id} wrap={false} style={{ marginBottom: px(9), paddingLeft: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(10.5), fontWeight: font.bold, color: text }}>{exp.role}</Text>
              <Text style={{ fontSize: fs(8.5), color: "#ffffff", backgroundColor: accent, borderRadius: 3, paddingVertical: 1.5, paddingHorizontal: 6 }}>
                {fmtRange(exp.start, exp.end, labels)}
              </Text>
            </View>
            <Text style={{ fontSize: fs(9.5), color: muted, fontWeight: font.semi, marginBottom: px(2.5) }}>
              {exp.company}
              {exp.location ? `  ·  ${exp.location}` : ""}
            </Text>
            {exp.description ? (
              <Text style={{ fontSize: fs(9.5), color: text, lineHeight: 1.45, marginBottom: px(2) }}>{exp.description}</Text>
            ) : null}
            {splitLines(exp.achievements).map((a, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: px(2) }}>
                <Text style={{ color: accent, marginRight: 5, fontSize: fs(9.5), fontWeight: font.bold }}>—</Text>
                <Text style={{ flex: 1, fontSize: fs(9.5), color: text, lineHeight: 1.45 }}>{a}</Text>
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
          <View key={edu.id} wrap={false} style={{ marginBottom: px(6), paddingLeft: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(10), fontWeight: font.bold, color: text }}>{edu.degree}</Text>
              <Text style={{ fontSize: fs(8.5), color: muted }}>{fmtRange(edu.start, edu.end, labels)}</Text>
            </View>
            <Text style={{ fontSize: fs(9), color: muted }}>{edu.school}</Text>
          </View>
        ))}
      </View>
    ),
    skills: () => (
      <View key="skills">
        <H>{labels.skills}</H>
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingLeft: 16 }}>
          {data.skills.map((sk) => (
            <Text
              key={sk.id}
              style={{
                fontSize: fs(8.5),
                color: text,
                backgroundColor: "#f3f4f6",
                borderLeftWidth: 2,
                borderLeftColor: accent,
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
          <View key={p.id} wrap={false} style={{ marginBottom: px(6), paddingLeft: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={{ fontSize: fs(10), fontWeight: font.bold, color: text }}>{p.name}</Text>
              {splitTools(p.tools).length ? (
                <Text style={{ fontSize: fs(7.5), color: accent, marginLeft: 6, fontWeight: font.semi }}>
                  {splitTools(p.tools).join(" · ")}
                </Text>
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
    languages: () => (
      <View key="languages">
        <H>{labels.languages}</H>
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingLeft: 16 }}>
          {data.languages.map((l) => (
            <Text key={l.id} style={{ fontSize: fs(9.5), color: text, marginRight: 14 }}>
              <Text style={{ fontWeight: font.bold }}>{l.name}</Text>
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
          <View key={c.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: px(3), paddingLeft: 16 }}>
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
    <Page size={design.paper} style={{ fontFamily: font.family, color: text }}>
      {/* Accent header band */}
      <View style={{ backgroundColor: accent, paddingVertical: px(22), paddingHorizontal: px(36), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1, paddingRight: 14 }}>
          <Text style={{ fontSize: fs(23), fontWeight: font.bold, color: "#ffffff", letterSpacing: 0.5 }}>{profile.fullName}</Text>
          <Text style={{ fontSize: fs(11), color: "#ffffff", opacity: 0.92, marginTop: px(2) }}>{profile.title}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: px(6) }}>
            {contactItems(profile).map((c, i) => (
              <Text key={i} style={{ fontSize: fs(8), color: "#ffffff", opacity: 0.85, marginRight: 10, marginBottom: 2 }}>
                {c}
              </Text>
            ))}
          </View>
        </View>
        {design.showPhoto && profile.photo ? (
          <Image
            src={profile.photo}
            style={{ width: 66, height: 66, borderRadius: photoR(66), objectFit: "cover", borderWidth: 2, borderColor: "#ffffff" }}
          />
        ) : null}
        {qr ? (
          <Image src={qr} style={{ width: 46, height: 46, marginLeft: 10, backgroundColor: "#ffffff", padding: 3, borderRadius: 4 }} />
        ) : null}
      </View>

      <View style={{ paddingVertical: px(8), paddingHorizontal: px(36) }}>{order.map((key) => blocks[key]?.())}</View>

      <Text
        fixed
        style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontSize: 7, color: "#9ca3af" }}
        render={({ pageNumber, totalPages }) => (totalPages > 1 ? `${pageNumber} / ${totalPages}` : "")}
      />
    </Page>
  );
}
