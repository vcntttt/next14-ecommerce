"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateRole } from "@/actions/users/update-role";
import { useOptimistic } from "react";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Props {
  role: Role;
  userId: string;
}

export const RoleSwitcher = ({ role, userId }: Props) => {
  const [optimisticRole, updateOptimisticRole] = useOptimistic(
    role,
    (state, newRole: Role) => newRole
  );
  const { data: session } = useSession();

  const handleUpdateRole = async (value: Role) => {
    updateOptimisticRole(value);
    await updateRole(userId, value);
  };

  return (
    <Select
      disabled={session?.user?.id === userId} //todo: si dejarlo pero que tenga que confirmar mediante un dialog
      value={optimisticRole}
      onValueChange={(value) => handleUpdateRole(value as Role)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value={Role.ADMIN}>{Role.ADMIN}</SelectItem>
          <SelectItem value={Role.USER}>{Role.USER}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
