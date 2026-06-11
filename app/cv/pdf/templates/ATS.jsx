import { Page, Text, View } from "@react-pdf/renderer";
import { contactItems, fmtRange, splitLines, splitTools, visibleSections } from "../shared";

// Plain text, single column, zero graphics: built to pass Applicant Tracking Systems.
// No photo, no QR, no color — by design, regardless of the design settings.
export default function ATS({ data, theme, sections, design }) {
  const { profile } = data;
  const { px, fs, labels } = theme;
  const family = "Helvetica";

  const H = ({ children }) => (
    <Text
      style={{
        fontSize: fs(11),
        fontFamily: family,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginTop: px(13),
        marginBottom: px(5),
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        paddingBottom: px(2),
      }}
    >
      {children}
    </Text>
  );

  const order = visibleSections(sections, data);

  const blocks = {
    summary: () => (
      <View key="summary">
        <H>{labels.summary}</H>
        <Text style={{ fontSize: fs(9.5), lineHeight: 1.45 }}>{profile.summary}</Text>
      </View>
    ),
    experience: () => (
      <View key="experience">
        <H>{labels.experience}</H>
        {data.experience.map((exp) => (
          <View key={exp.id} wrap={false} style={{ marginBottom: px(8) }}>
            <Text style={{ fontSize: fs(10), fontWeight: "bold" }}>
              {exp.role}
              {exp.company ? ` — ${exp.company}` : ""}
            </Text>
            <Text style={{ fontSize: fs(9), marginBottom: px(2) }}>
              {[fmtRange(exp.start, exp.end, labels), exp.location].filter(Boolean).join("  |  ")}
            </Text>
            {exp.description ? (
              <Text style={{ fontSize: fs(9.5), lineHeight: 1.45, marginBottom: px(1) }}>{exp.description}</Text>
            ) : null}
            {splitLines(exp.achievements).map((a, i) => (
              <Text key={i} style={{ fontSize: fs(9.5), lineHeight: 1.45 }}>
                {"-  "}
                {a}
              </Text>
            ))}
          </View>
        ))}
      </View>
    ),
    education: () => (
      <View key="education">
        <H>{labels.education}</H>
        {data.education.map((edu) => (
          <View key={edu.id} wrap={false} style={{ marginBottom: px(5) }}>
            <Text style={{ fontSize: fs(10), fontWeight: "bold" }}>{edu.degree}</Text>
            <Text style={{ fontSize: fs(9) }}>
              {[edu.school, fmtRange(edu.start, edu.end, labels)].filter(Boolean).join("  |  ")}
            </Text>
          </View>
        ))}
      </View>
    ),
    skills: () => (
      <View key="skills">
        <H>{labels.skills}</H>
        <Text style={{ fontSize: fs(9.5), lineHeight: 1.5 }}>{data.skills.map((sk) => sk.name).join(", ")}</Text>
      </View>
    ),
    projects: () => (
      <View key="projects">
        <H>{labels.projects}</H>
        {data.projects.map((p) => (
          <View key={p.id} wrap={false} style={{ marginBottom: px(5) }}>
            <Text style={{ fontSize: fs(10), fontWeight: "bold" }}>
              {p.name}
              {splitTools(p.tools).length ? ` (${splitTools(p.tools).join(", ")})` : ""}
            </Text>
            {p.description ? <Text style={{ fontSize: fs(9.5), lineHeight: 1.45 }}>{p.description}</Text> : null}
            {p.link ? <Text style={{ fontSize: fs(8.5) }}>{p.link}</Text> : null}
          </View>
        ))}
      </View>
    ),
    languages: () => (
      <View key="languages">
        <H>{labels.languages}</H>
        <Text style={{ fontSize: fs(9.5) }}>
          {data.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(", ")}
        </Text>
      </View>
    ),
    certifications: () => (
      <View key="certifications">
        <H>{labels.certifications}</H>
        {data.certifications.map((c) => (
          <Text key={c.id} style={{ fontSize: fs(9.5), marginBottom: px(2) }}>
            {[c.name, c.issuer, c.year].filter(Boolean).join(" — ")}
          </Text>
        ))}
      </View>
    ),
  };

  return (
    <Page size={design.paper} style={{ fontFamily: family, paddingVertical: px(40), paddingHorizontal: px(46), color: "#000000" }}>
      <Text style={{ fontSize: fs(18), fontWeight: "bold" }}>{profile.fullName}</Text>
      {profile.title ? <Text style={{ fontSize: fs(11), marginTop: px(2) }}>{profile.title}</Text> : null}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: px(4) }}>
        {contactItems(profile).map((c, i, arr) => (
          <Text key={i} style={{ fontSize: fs(9), lineHeight: 1.4 }}>
            {c}
            {i < arr.length - 1 ? "  |  " : ""}
          </Text>
        ))}
      </View>

      {order.map((key) => blocks[key]?.())}
    </Page>
  );
}
