const Waitlist = ({ waitlist }: { waitlist: any[] }) => {
  const onWaitlistRemoveClick = () => {
    console.log("remove from waitlist");
  };

  return (
    <div className="p-4">
      <div className="text-xl">Waitlist</div>
      {waitlist.map((guest, index) => {
        if (guest === "Eric") {
          return (
            <div key={index} className="flex gap-x-2">
              <div>Eric</div>
              <button onClick={onWaitlistRemoveClick}>
                Remove from waitlist
              </button>
            </div>
          );
        }
        return <div key={index}>{guest}</div>;
      })}
    </div>
  );
};

export default Waitlist;
