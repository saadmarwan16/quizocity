import Button from "@mui/material/Button";

const QuizControlButtons = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2 py-6">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Button
          key={num}
          variant="contained"
          disableElevation
          style={{
            minWidth: 20,
            minHeight: 20,
            padding: 0,
            backgroundColor: "#ffffff80",
          }}
        />
      ))}
    </div>
  );
};

export default QuizControlButtons;
