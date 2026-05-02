import { betCartReducer, toggleSelection } from "@/store/cart/cart-slice";
import { betSlipSelectionMock } from "@/mock-data/bet-slip-selection";

describe("cart-slice", () => {
  it("adds selection on first toggle and removes same selection on second toggle", () => {
    const stateAfterAdd = betCartReducer(undefined, toggleSelection(betSlipSelectionMock));
    expect(stateAfterAdd.selectionsByMatchId["match-1"]).toEqual(betSlipSelectionMock);

    const stateAfterRemove = betCartReducer(stateAfterAdd, toggleSelection(betSlipSelectionMock));
    expect(stateAfterRemove.selectionsByMatchId["match-1"]).toBeUndefined();
  });
});
