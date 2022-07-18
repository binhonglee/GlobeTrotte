import UserObj from "@/wings/UserObj";

export function processBioToServer(bio: string): string {
  return bio
    .replaceAll('"', '\\"')
    .replaceAll("\t", "")
    .replaceAll("\n", "\\n");
}

export function sameUser(user1: UserObj, user2: UserObj): boolean {
  return (
    user1.ID.valueOf() === user2.ID.valueOf() &&
    user1.details.bio.valueOf() === user2.details.bio.valueOf() &&
    user1.details.email.valueOf() === user2.details.email.valueOf() &&
    user1.details.link.valueOf() === user2.details.link.valueOf() &&
    user1.details.name.valueOf() === user2.details.name.valueOf() &&
    user1.details.username.valueOf() === user2.details.username.valueOf()
  );
}
