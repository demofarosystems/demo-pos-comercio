"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AgrupadoresTable } from "@/components/agrupadores/agrupadores-table";
import { AgrupadorForm } from "@/components/agrupadores/agrupador-form";
import { useAgrupadores } from "@/hooks/use-agrupadores";

export function AgrupadoresContent() {
  const {
    agrupadores,
    error,
    addAgrupador,
    editAgrupador,
  } = useAgrupadores();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingAgrupador, setEditingAgrupador] = React.useState<unknown | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);

  const openCreateDialog = () => {
    setEditingAgrupador(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (agrupador: unknown) => {
    setEditingAgrupador(agrupador);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingAgrupador(undefined);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Agrupadores</h2>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Agrupador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>
                {editingAgrupador ? "Editar Agrupador" : "Nuevo Agrupador"}
              </DialogTitle>
              <DialogDescription>
                {editingAgrupador
                  ? "Modifica el nombre del agrupador."
                  : "Completa la información para crear un nuevo agrupador."}
              </DialogDescription>
            </DialogHeader>
            <AgrupadorForm
              agrupador={editingAgrupador}
              onSubmit={async (data) => {
                setIsLoading(true);
                if (editingAgrupador) {
                  await editAgrupador(editingAgrupador.id, data);
                } else {
                  await addAgrupador(data);
                }
                setIsLoading(false);
                closeDialog();
              }}
              onCancel={closeDialog}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <div className="rounded-lg border bg-card">
        <AgrupadoresTable data={agrupadores} onEdit={openEditDialog} />
      </div>
    </div>
  );
} 