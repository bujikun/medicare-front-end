const ViewProductLayout = ({children}) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "0.2rem",
        height:"80vh"
      }}
    >
      {children}
    </div>
  );
}
export default ViewProductLayout