import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  const TabButton = ({ label, value }) => {
    return (
      <button
        onClick={() => setActiveTab(value)}
        className={`tab w-full font-bold ${
          activeTab === value
            ? "!bg-cyan-500/20 !text-cyan-400"
            : "!text-slate-400 "
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="tabs tabs-box border-none bg-transparent p-2 m-2 grid grid-cols-2 justify-between">
      <TabButton label={"Chats"} value={"chats"} />
      <TabButton label={"Contacts"} value={"contacts"} />
    </div>
  );
}
export default ActiveTabSwitch;
