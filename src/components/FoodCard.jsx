// ... existing imports ...

const FoodCard = ({ food, onAddToList }) => {
  return (
    <div className="food-card">
      {/* ... existing food card content ... */}
      
      {/* Make sure the button has proper styling */}
      <button 
        className="add-to-list-button"
        onClick={() => onAddToList(food)}
      >
        Add to Shopping List
      </button>
    </div>
  );
};

export default FoodCard;