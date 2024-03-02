"use client";

import LoadingSpinner from "@/components/ui/spinner";
import { api } from "@/lib/trpc";
import { ZBookmarkList } from "@/lib/types/api/lists";
import { keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";

function ListItem({
  name,
  icon,
  path,
}: {
  name: string;
  icon: string;
  path: string;
}) {
  return (
    <Link href={path}>
      <div className="bg-background rounded-md border border-gray-200 px-4 py-2 text-lg">
        <p className="text-nowrap">
          {icon} {name}
        </p>
      </div>
    </Link>
  );
}

export default function AllListsView({
  initialData,
}: {
  initialData: ZBookmarkList[];
}) {
  const { data: lists } = api.lists.list.useQuery(undefined, {
    initialData: { lists: initialData },
    placeholderData: keepPreviousData,
  });

  if (!lists) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <ListItem name="Favourites" icon="⭐️" path={`/dashboard/favourites`} />
      <ListItem name="Archive" icon="🗄️" path={`/dashboard/archive`} />
      {lists.lists.map((l) => (
        <ListItem
          key={l.id}
          name={l.name}
          icon={l.icon}
          path={`/dashboard/lists/${l.id}`}
        />
      ))}
    </div>
  );
}
