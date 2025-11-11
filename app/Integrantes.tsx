"use client";

import { Button } from "@/components/button";

type IntegrantesProps = {
  teamMembers: string[];
  manualTasksByIndex: Record<number, string>;
  addMember: () => void;
  handleMemberChange: (index: number, value: string) => void;
  removeMember: (index: number) => void;
  handleManualTaskChange: (index: number, value: string) => void;
};

export default function Integrantes({
  teamMembers,
  manualTasksByIndex,
  addMember,
  handleMemberChange,
  removeMember,
  handleManualTaskChange,
}: IntegrantesProps) {
  return (
    <div className="card space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">👥 Integrantes</h3>
        <Button onClick={addMember}>+ Agregar</Button>
      </div>

      {teamMembers.map((m, i) => (
        <div key={i} className="flex items-center gap-3">
          <input
            value={m}
            onChange={(e) => handleMemberChange(i, e.target.value)}
            placeholder={`Integrante ${i + 1}`}
            className="flex-1"
          />
          <button onClick={() => removeMember(i)} className="bg-red-100 px-3 py-2 rounded-md">
            🗑️
          </button>
        </div>
      ))}

      <div className="pt-3 border-t">
        <h4 className="font-semibold text-sm">📝 Tareas manuales</h4>
        {teamMembers.map((m, i) => (
          <div key={i} className="flex items-center gap-3 mt-1">
            <span className="w-1/3 text-sm text-gray-600">{m || `Integrante ${i + 1}`}</span>
            <input
              value={manualTasksByIndex[i] || ""}
              onChange={(e) => handleManualTaskChange(i, e.target.value)}
              placeholder="Ej: HTML | CSS"
              className="flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
