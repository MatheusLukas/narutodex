import { CardCategory } from "@/components/cardCategory";
import { TabsCreate } from "@/components/tabsCreate";

export default async function Page() {
  return (
    <main id="create" className="flex flex-col gap-14 my-20 overflow-y-hidden">
      <div className="flex justify-center">
        <TabsCreate />
      </div>
      <div className="group">
        <CardCategory />
      </div>
    </main>
  );
}
