import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RooState } from "../redux/combile";
import * as Web3Reducer from "../redux/web3/web3.reducer";
import * as PoolReducer from "../redux/pool/pool.reducer";
import { getPool } from "../redux/pool/pool.action.createors";

export default function Pool() {
  const dispatch = useDispatch();

  const { web3, loading, error, account, haoBalance } = useSelector<
    RooState,
    Web3Reducer.State
  >((state) => state.web3);

  const { apr, totalStaked, dailyReward, accountStaked, accountReward } =
    useSelector<RooState, PoolReducer.State>((state) => state.pool);

  let aprDisplay = (apr * 100).toPrecision(4);

  const formmatFromWei = (num: Number) => {
    return web3?.utils.fromWei(num.toString(), "ether");
  };

  const haoBalanceFromWei = formmatFromWei(haoBalance);
  const totalStakedFromWei = formmatFromWei(totalStaked);
  const dailyRewardFromWei = formmatFromWei(dailyReward);
  const accountStakedFromWei = formmatFromWei(accountStaked);
  const accountRewardFromWei = formmatFromWei(accountReward);

  useEffect(() => {
    setTimeout(() => dispatch(getPool()), 500);
    return () => {};
  }, [web3]);

  return (
    <div className="bg-slate-200/40  backdrop-blur rounded-2xl h-[478px] w-[468px] p-8 space-y-4 flex flex-col">
      <div className="flex justify-between border-b border-slate-500 pb-4">
        <div className="flex flex-1  flex-col">
          <div className="text-xs font-bold tracking-wider">TOTAL STAKED</div>
          <div className="text-xs font-medium">{totalStakedFromWei} Hao</div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-xs font-bold tracking-wider">DAILY REWARD</div>
          <div className="text-xs font-medium">
            {dailyRewardFromWei} Hao / Day
          </div>
        </div>
        <div className="flex ml-10 items-end flex-col">
          <div className="text-xs font-bold tracking-wider">APR</div>
          <div className="text-xs font-medium">{aprDisplay}%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold tracking-wider">
            AVAILABLE IN WALLET
          </div>
          <div className="text-2xl font-medium">
            {haoBalanceFromWei ? Number(haoBalanceFromWei).toLocaleString() : 0}
            <span className="text-sm font-medium ml-2">Hao</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold tracking-wider">TOTAL STAKED</div>
          <div className="text-2xl font-medium">
            {haoBalanceFromWei
              ? Number(accountStakedFromWei).toLocaleString()
              : 0}
            <span className="text-sm font-medium ml-2">Hao</span>
          </div>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="bg-slate-400 rounded-md px-4 py-3 flex justify-between items-center">
        <div>
          <div className="font-bold text-white tracking-wider">
            CLAIMABLE REWARDS
          </div>
          <div className="text-xl font-medium text-white">
            {accountRewardFromWei
              ? Number(accountRewardFromWei).toLocaleString()
              : 0}
            <span className="text-sm ml-2">Hao</span>
          </div>
        </div>
        <button className="bg-slate-500 py-2 px-4 text-white rounded-md">
          Claim
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        <button className="py-3 bg-slate-400 rounded-md text-white">
          Stake
        </button>
        <button className="py-3 bg-slate-400 rounded-md text-white">
          UnStake
        </button>
      </div>
    </div>
  );
}
