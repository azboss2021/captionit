import { DatabaseUser } from "@/lib/types";
import { dateToShortDate } from "@/lib/utils";

const AccountInformation = ({ user }: { user: DatabaseUser }) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold">Account Information</h2>
      <div className="flex flex-col gap-1">
        <span>
          <span className="font-bold">Name: </span>
          {user.name}
        </span>
        <span>
          <span className="font-bold">Email: </span> {user.email}
        </span>
        <span>
          <span className="font-bold">Created: </span>{" "}
          {dateToShortDate(new Date(user.createdAt))}
        </span>
      </div>
    </section>
  );
};
export default AccountInformation;
