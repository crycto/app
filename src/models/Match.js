import moment from "moment";
const CREATED = "Created",
  COMPLETED = "Completed",
  FORFEITED = "Forfeited";

const contestDescriptionV1 = `Predict the number of runs that would be scored totally by both teams at
        the end of this match`;
const placeHolderScoreV1 = 300;

export default class Match {
  constructor(match) {
    this.id = match.id;
    this.uri = match.uri;
    this.matchDetails = new MatchDetails(match.matchDetails);
    this.contestDescription = contestDescriptionV1;
    this.placeHolderScore = placeHolderScoreV1;
    this.minScore = +match.minScore;
    this.scoreMultiple = +match.scoreMultiple;
    this.deadline = match.deadline;
    this.winningScore = +match.winningScore;
    this.totalBets = match.totalBets;
    this.totalAmount =
      match.totalAmount && parseFloat(match.totalAmount).toFixed(2);
    this.rewardRate = match.rewardRate;
    this.rewardAmount =
      match.rewardAmount && parseFloat(match.rewardAmount).toFixed(2);

    this.bet = match.bets?.length === 1 ? new Bet(match.bets[0]) : undefined;
    this.positions = match.positions?.map((p) => new Position(p));
    this.totalWinners =
      this.positions?.find((p) => p.score == this.winningScore)?.bets ?? 0;
    this.stage = match.stage;
    this.setTimeLeft();
  }
  isAtStage(stage) {
    return this.stage === stage;
  }
  isTakingBets() {
    return this.isAtStage(CREATED) && !this.isDeadlineCrossed();
  }
  isDeadlineCrossed() {
    return this.deadline - +new Date() / 1000 <= 0;
  }
  isForfeited() {
    return this.stage === FORFEITED;
  }
  isCompleted() {
    return this.stage === COMPLETED;
  }
  setTimeLeft() {
    this.timeLeft = this._timeLeft();
  }
  _timeLeft() {
    const now = +new Date() / 1000;
    const secondsLeft = this.deadline - now;
    const duration = moment.duration(secondsLeft, "seconds");
    return `${duration.humanize({ h: 50, s: 120 })}`;
    // return `${parseInt(duration.asHours())} : ${parseInt(
    //   duration.minutes()
    // )} : ${duration.seconds().toString().padStart(2, "0")}`;
  }
  getPlacedBetScoreRange() {
    if (!this.bet) {
      return null;
    }
    return `${this.bet.score} - ${+this.bet.score + this.scoreMultiple - 1}`;
  }
  getPlacedBetAmount() {
    return this.bet ? parseFloat(this.bet.amount).toFixed(3) : null;
  }
  getWinningScoreRange() {
    if (!this.winningScore) {
      return null;
    }
    return `${this.winningScore} - ${
      this.winningScore + this.scoreMultiple - 1
    }`;
  }
  getPayout(score) {
    const position = this.positions?.find((p) => p.score === score);
    return (
      position &&
      parseFloat(
        1 +
          (this.isAtStage(COMPLETED)
            ? this.rewardAmount
            : this.totalAmount - position.amount) /
            position.amount
      ).toFixed(2)
    );
  }
  getBiggestPayout() {
    return this.positions?.reduce((max, p) => {
      const payout = this.getPayout(p.score);
      return Math.max(max, payout);
    }, 0);
  }
  isBetPlaced() {
    return !!this.bet;
  }
  isBetWon() {
    return this.bet?.score == this.winningScore;
  }
  isYetToClaim() {
    return this.isCompleted() && this.isBetWon() && !this.bet?.claimed;
  }
  isClaimed() {
    return this.bet?.claimed;
  }
  isRefundable() {
    return this.isForfeited() && !this.isRefunded();
  }
  isRefunded() {
    return this.bet?.refunded;
  }
}

const Entity = { RUNS: 0, WICKETS: 1 };
const Period = {
  0: "Entire",
  1: "Day 1",
  2: "Day 2",
  3: "Day 3",
  4: "Day 4",
  5: "Day 5",
  6: "Powerplay",
};
const formatDate = (date) => `Aug ${date.getDate()}, 07:30`; //TODO:

class MatchDetails {
  constructor(match) {
    this.team1 = match["team1.symbol"];
    this.team2 = match["team2.symbol"];
    this.date = formatDate(new Date(match.date));
    this.venue = match.venue;
    this.entity = Entity[match.entity];
    this.period = match.period ?? 0;
  }
  isPredictionForEntireMatch() {
    return this.period === Period.ENTIRE;
  }
  isRunsPrediction() {
    return this.entity === Entity.RUNS;
  }
  isWicketsPrediction() {
    return this.entity === Entity.WICKETS;
  }
  getPeriodText() {
    return Period[this.period];
  }
}

class Bet {
  constructor({ score, amount, claimed, refunded }) {
    this.score = score;
    this.amount = amount;
    this.claimed = claimed;
    this.refunded = refunded;
  }
}

class Position {
  constructor({ score, amount, bets }) {
    this.score = score;
    this.amount = amount;
    this.bets = bets;
  }
}
