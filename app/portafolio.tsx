"use client";

import React from "react";

type ProjectType = {
  id: string;
  title: string;
  colorClass: string;
  sprints: string[];
  tasksBySprint: Record<string, string[]>;
};

type Props = {
  projectTypes: ProjectType[];
  projectTypeIndex: number;
  setProjectTypeIndex: (n: number) => void;
  setProjectType: (id: string) => void;
  prevProjectType: () => void;
  nextProjectType: () => void;
};

export default function Portafolio({
  projectTypes,
  projectTypeIndex,
  setProjectTypeIndex,
  setProjectType,
  prevProjectType,
  nextProjectType,
}: Props) {
  return (
    <>
      {/* Desktop: aside */}
      <aside className="hidden lg:block">
        <div className="card flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">📚 Tipos de proyecto</h4>
            <div className="flex gap-2">
              <button onClick={prevProjectType} className="px-2 py-1 bg-white border rounded-md">◀</button>
              <button onClick={nextProjectType} className="px-2 py-1 bg-white border rounded-md">▶</button>
            </div>
          </div>

          <div className="space-y-3">
            {projectTypes.map((pt, idx) => (
              <div
                key={pt.id}
                className={`${idx === projectTypeIndex ? "ring-2 ring-offset-2 ring-indigo-300" : ""} p-3 rounded-lg transition cursor-pointer`}
                onClick={() => {
                  setProjectTypeIndex(idx);
                  setProjectType(pt.id);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{pt.title}</div>
                    <div className="text-xs text-gray-500">{pt.sprints.length} sprints</div>
                  </div>
                  <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${pt.colorClass}`} />
                </div>
                {idx === projectTypeIndex && (
                  <div className="mt-3 text-xs text-gray-600">
                    {pt.sprints.map((s, i) => <div key={i}>• {s}</div>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile: slider */}
      <div className="lg:hidden">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">📚 Tipos de proyecto</h4>
            <div className="flex gap-2">
              <button onClick={prevProjectType} className="px-2 py-1 bg-white border rounded-md">◀</button>
              <button onClick={nextProjectType} className="px-2 py-1 bg-white border rounded-md">▶</button>
            </div>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto">
            {projectTypes.map((pt, idx) => (
              <div
                key={pt.id}
                className={`min-w-[220px] p-3 rounded-lg ${idx === projectTypeIndex ? "ring-2 ring-indigo-300" : "bg-white"} cursor-pointer`}
                onClick={() => {
                  setProjectTypeIndex(idx);
                  setProjectType(pt.id);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{pt.title}</div>
                  <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${pt.colorClass}`} />
                </div>
                {idx === projectTypeIndex && (
                  <div className="mt-2 text-xs text-gray-600">
                    {pt.sprints.map((s) => <div key={s}>• {s}</div>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
