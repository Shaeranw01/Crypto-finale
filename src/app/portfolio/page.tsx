import AddAsset from "../components/AddAsset";

export default async function Portfolio({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className=" w-full min-h-screen dark:bg-[#13121A] relative dark:text-white font-[Space_Grotesk] bg-[#F3F5F9] text-[#353570] p-20 box-border ">
      <AddAsset />
    </div>
  );
}
