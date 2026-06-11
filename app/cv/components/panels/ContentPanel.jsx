"use client";
import { ui } from "../../i18n";
import { useCVStore } from "../../store";
import { resizeImage } from "../../utils";
import { AddBtn, Field, Input, ItemCard, PanelTitle, Row, TextArea } from "../fields";

function ItemsEditor({ section, titleOf, subtitleOf, children }) {
  const { data, lang, addItem, removeItem, moveItem } = useCVStore();
  const t = ui[lang];
  const list = data[section];
  return (
    <>
      {list.map((item, i) => (
        <ItemCard
          key={item.id}
          title={titleOf(item)}
          subtitle={subtitleOf?.(item)}
          onRemove={() => removeItem(section, item.id)}
          onUp={() => moveItem(section, item.id, -1)}
          onDown={() => moveItem(section, item.id, 1)}
          isFirst={i === 0}
          isLast={i === list.length - 1}
          removeLabel={t.delete}
        >
          {children(item)}
        </ItemCard>
      ))}
      <AddBtn onClick={() => addItem(section)}>{t.add}</AddBtn>
    </>
  );
}

export default function ContentPanel() {
  const { data, lang, setProfile, updateItem } = useCVStore();
  const t = ui[lang];
  const p = data.profile;

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfile("photo", await resizeImage(file));
    e.target.value = "";
  };

  return (
    <div>
      <PanelTitle>{t.profile}</PanelTitle>
      <Field label={t.fullName}>
        <Input value={p.fullName} onChange={(e) => setProfile("fullName", e.target.value)} />
      </Field>
      <Field label={t.jobTitle}>
        <Input value={p.title} onChange={(e) => setProfile("title", e.target.value)} />
      </Field>
      <Row>
        <Field label={t.email}>
          <Input type="email" value={p.email} onChange={(e) => setProfile("email", e.target.value)} />
        </Field>
        <Field label={t.phone}>
          <Input value={p.phone} onChange={(e) => setProfile("phone", e.target.value)} />
        </Field>
      </Row>
      <Field label={t.address}>
        <Input value={p.address} onChange={(e) => setProfile("address", e.target.value)} />
      </Field>
      <Row>
        <Field label={t.website}>
          <Input value={p.website} onChange={(e) => setProfile("website", e.target.value)} />
        </Field>
        <Field label={t.linkedin}>
          <Input value={p.linkedin} onChange={(e) => setProfile("linkedin", e.target.value)} />
        </Field>
      </Row>
      <Field label={t.github}>
        <Input value={p.github} onChange={(e) => setProfile("github", e.target.value)} />
      </Field>
      <Field label={t.photo}>
        <div className="flex items-center gap-3">
          {p.photo ? (
            <img src={p.photo} alt="" className="w-10 h-10 rounded-full object-cover border border-[#1a3a5c]" />
          ) : null}
          <label className="cursor-pointer text-xs text-[#00d4ff] border border-[#1a3a5c] rounded-lg px-3 py-2 hover:border-[#00d4ff] transition-colors">
            {t.uploadPhoto}
            <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
          </label>
          {p.photo ? (
            <button type="button" onClick={() => setProfile("photo", "")} className="text-xs text-red-400 hover:underline">
              {t.removePhoto}
            </button>
          ) : null}
        </div>
      </Field>
      <Field label={t.summaryLabel} hint={t.summaryHint}>
        <TextArea rows={4} value={p.summary} onChange={(e) => setProfile("summary", e.target.value)} />
      </Field>

      <PanelTitle>{ui[lang].tabContent === "Contenu" ? "Expérience" : "Experience"}</PanelTitle>
      <ItemsEditor section="experience" titleOf={(it) => it.role} subtitleOf={(it) => it.company}>
        {(it) => (
          <>
            <Row>
              <Field label={t.role}>
                <Input value={it.role} onChange={(e) => updateItem("experience", it.id, "role", e.target.value)} />
              </Field>
              <Field label={t.company}>
                <Input value={it.company} onChange={(e) => updateItem("experience", it.id, "company", e.target.value)} />
              </Field>
            </Row>
            <Row>
              <Field label={t.start}>
                <Input value={it.start} onChange={(e) => updateItem("experience", it.id, "start", e.target.value)} />
              </Field>
              <Field label={t.end}>
                <Input value={it.end} onChange={(e) => updateItem("experience", it.id, "end", e.target.value)} />
              </Field>
            </Row>
            <Field label={t.location}>
              <Input value={it.location} onChange={(e) => updateItem("experience", it.id, "location", e.target.value)} />
            </Field>
            <Field label={t.description}>
              <TextArea rows={2} value={it.description} onChange={(e) => updateItem("experience", it.id, "description", e.target.value)} />
            </Field>
            <Field label={t.achievements} hint={t.achievementsHint}>
              <TextArea rows={4} value={it.achievements} onChange={(e) => updateItem("experience", it.id, "achievements", e.target.value)} />
            </Field>
          </>
        )}
      </ItemsEditor>

      <PanelTitle>{lang === "fr" ? "Formation" : "Education"}</PanelTitle>
      <ItemsEditor section="education" titleOf={(it) => it.degree} subtitleOf={(it) => it.school}>
        {(it) => (
          <>
            <Field label={t.degree}>
              <Input value={it.degree} onChange={(e) => updateItem("education", it.id, "degree", e.target.value)} />
            </Field>
            <Field label={t.school}>
              <Input value={it.school} onChange={(e) => updateItem("education", it.id, "school", e.target.value)} />
            </Field>
            <Row>
              <Field label={t.start}>
                <Input value={it.start} onChange={(e) => updateItem("education", it.id, "start", e.target.value)} />
              </Field>
              <Field label={t.end}>
                <Input value={it.end} onChange={(e) => updateItem("education", it.id, "end", e.target.value)} />
              </Field>
            </Row>
            <Field label={t.description}>
              <TextArea rows={2} value={it.description} onChange={(e) => updateItem("education", it.id, "description", e.target.value)} />
            </Field>
          </>
        )}
      </ItemsEditor>

      <PanelTitle>{lang === "fr" ? "Compétences" : "Skills"}</PanelTitle>
      <ItemsEditor section="skills" titleOf={(it) => it.name} subtitleOf={(it) => "●".repeat(it.level || 0)}>
        {(it) => (
          <Row>
            <Field label={t.skillName}>
              <Input value={it.name} onChange={(e) => updateItem("skills", it.id, "name", e.target.value)} />
            </Field>
            <Field label={`${t.level} (1-5)`}>
              <Input
                type="number"
                min={1}
                max={5}
                value={it.level}
                onChange={(e) => updateItem("skills", it.id, "level", Math.min(5, Math.max(1, Number(e.target.value) || 1)))}
              />
            </Field>
          </Row>
        )}
      </ItemsEditor>

      <PanelTitle>{lang === "fr" ? "Projets" : "Projects"}</PanelTitle>
      <ItemsEditor section="projects" titleOf={(it) => it.name} subtitleOf={(it) => it.tools}>
        {(it) => (
          <>
            <Field label={t.projName}>
              <Input value={it.name} onChange={(e) => updateItem("projects", it.id, "name", e.target.value)} />
            </Field>
            <Field label={t.description}>
              <TextArea rows={2} value={it.description} onChange={(e) => updateItem("projects", it.id, "description", e.target.value)} />
            </Field>
            <Field label={t.tools}>
              <Input value={it.tools} onChange={(e) => updateItem("projects", it.id, "tools", e.target.value)} />
            </Field>
            <Field label={t.link}>
              <Input value={it.link} onChange={(e) => updateItem("projects", it.id, "link", e.target.value)} />
            </Field>
          </>
        )}
      </ItemsEditor>

      <PanelTitle>{lang === "fr" ? "Langues" : "Languages"}</PanelTitle>
      <ItemsEditor section="languages" titleOf={(it) => it.name} subtitleOf={(it) => it.level}>
        {(it) => (
          <Row>
            <Field label={t.langName}>
              <Input value={it.name} onChange={(e) => updateItem("languages", it.id, "name", e.target.value)} />
            </Field>
            <Field label={t.langLevel}>
              <Input value={it.level} onChange={(e) => updateItem("languages", it.id, "level", e.target.value)} />
            </Field>
          </Row>
        )}
      </ItemsEditor>

      <PanelTitle>{lang === "fr" ? "Certifications" : "Certifications"}</PanelTitle>
      <ItemsEditor section="certifications" titleOf={(it) => it.name} subtitleOf={(it) => it.issuer}>
        {(it) => (
          <>
            <Field label={t.certName}>
              <Input value={it.name} onChange={(e) => updateItem("certifications", it.id, "name", e.target.value)} />
            </Field>
            <Row>
              <Field label={t.issuer}>
                <Input value={it.issuer} onChange={(e) => updateItem("certifications", it.id, "issuer", e.target.value)} />
              </Field>
              <Field label={t.year}>
                <Input value={it.year} onChange={(e) => updateItem("certifications", it.id, "year", e.target.value)} />
              </Field>
            </Row>
          </>
        )}
      </ItemsEditor>
    </div>
  );
}
