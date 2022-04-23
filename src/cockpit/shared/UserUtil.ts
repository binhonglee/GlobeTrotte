import UserObj from "@/wings/UserObj";

export enum UserSource {
  Server = "server",
  Storage = "storage",
}

export function processBioFromServer(bio: string): string {
  return bio.replaceAll("\\\\n", "\n");
}

export function processBioFromStorage(bio: string): string {
  return bio.replaceAll("\\n", "\n");
}

export function processBioToServer(bio: string): string {
  return bio
    .replaceAll("\\t", "\t")
    .replaceAll("\t", "")
    .replaceAll("\n", "\\\\n")
    .replaceAll("\\", "\\\\");
}

export function processBio(bio: string, bioSource: UserSource): string {
  switch (bioSource) {
    case UserSource.Server:
      return processBioFromServer(bio);
    case UserSource.Storage:
      return processBioFromStorage(bio);
  }
}

export function sameUser(
  user1: UserObj,
  user2: UserObj,
  user1Source: UserSource,
  user2Source: UserSource,
): boolean {
  return (
    user1.ID === user2.ID &&
    processBio(user1.details.bio.valueOf(), user1Source) ===
      processBio(user2.details.bio.valueOf(), user2Source) &&
    user1.details.email === user2.details.email &&
    user1.details.link === user2.details.link &&
    user1.details.name === user2.details.name &&
    user1.details.username === user2.details.username
  );
}
