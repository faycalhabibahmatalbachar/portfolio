"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { blankCV, defaultDesign, defaultSections, faycalPreset } from "./defaults";

const uid = () => Math.random().toString(36).slice(2, 9);

export const newItem = (section) => {
  switch (section) {
    case "experience":
      return { id: uid(), role: "", company: "", location: "", start: "", end: "", description: "", achievements: "" };
    case "education":
      return { id: uid(), degree: "", school: "", start: "", end: "", description: "" };
    case "skills":
      return { id: uid(), name: "", level: 4 };
    case "languages":
      return { id: uid(), name: "", level: "" };
    case "projects":
      return { id: uid(), name: "", description: "", tools: "", link: "" };
    case "certifications":
      return { id: uid(), name: "", issuer: "", year: "" };
    default:
      return { id: uid() };
  }
};

export const useCVStore = create(
  persist(
    (set) => ({
      lang: "fr",
      data: faycalPreset(),
      design: { ...defaultDesign },
      sections: defaultSections.map((s) => ({ ...s })),

      setLang: (lang) => set({ lang }),

      setProfile: (field, value) =>
        set((s) => ({ data: { ...s.data, profile: { ...s.data.profile, [field]: value } } })),

      setDesign: (field, value) => set((s) => ({ design: { ...s.design, [field]: value } })),

      addItem: (section) =>
        set((s) => ({ data: { ...s.data, [section]: [...s.data[section], newItem(section)] } })),

      updateItem: (section, id, field, value) =>
        set((s) => ({
          data: {
            ...s.data,
            [section]: s.data[section].map((it) => (it.id === id ? { ...it, [field]: value } : it)),
          },
        })),

      removeItem: (section, id) =>
        set((s) => ({ data: { ...s.data, [section]: s.data[section].filter((it) => it.id !== id) } })),

      moveItem: (section, id, dir) =>
        set((s) => {
          const list = [...s.data[section]];
          const i = list.findIndex((it) => it.id === id);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= list.length) return {};
          [list[i], list[j]] = [list[j], list[i]];
          return { data: { ...s.data, [section]: list } };
        }),

      toggleSection: (key) =>
        set((s) => ({
          sections: s.sections.map((sec) => (sec.key === key ? { ...sec, visible: !sec.visible } : sec)),
        })),

      moveSection: (key, dir) =>
        set((s) => {
          const list = [...s.sections];
          const i = list.findIndex((sec) => sec.key === key);
          const j = i + dir;
          if (i < 0 || j < 0 || j >= list.length) return {};
          [list[i], list[j]] = [list[j], list[i]];
          return { sections: list };
        }),

      importAll: ({ data, design, sections }) =>
        set((s) => ({
          data: data || s.data,
          design: design ? { ...defaultDesign, ...design } : s.design,
          sections: Array.isArray(sections) && sections.length ? sections : s.sections,
        })),

      loadPreset: () => set({ data: faycalPreset(), sections: defaultSections.map((s) => ({ ...s })) }),

      resetAll: () => set({ data: blankCV(), sections: defaultSections.map((s) => ({ ...s })) }),
    }),
    {
      name: "cv-studio",
      // Deep-merge design so configs saved before new options gain the defaults.
      merge: (persisted, current) => ({
        ...current,
        ...(persisted || {}),
        design: { ...current.design, ...(persisted?.design || {}) },
      }),
    }
  )
);
