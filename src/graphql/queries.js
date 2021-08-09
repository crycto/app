import { gql } from "@apollo/client";

export const TOURNAMENT = gql`
  query GetTournament {
    tournament(id: "1") {
      id
      minBetAmount
      totalBets
      totalAmount
      paused
    }
  }
`;

export const LATEST_MATCHES = gql`
  query GetLatestMatches(
    $deadline: Int!
    $connectedUser: String!
    $skip: Int
    $first: Int!
  ) {
    matches(
      #Need to review stage criteria
      where: { deadline_gte: $deadline, stage_not: "Forfeited" }
      orderBy: deadline
      orderDirection: "asc"
      skip: $skip
      first: $first
      queryId: 0
    ) {
      id
      uri
      minScore
      scoreMultiple
      deadline
      winningScore
      totalBets
      totalAmount
      rewardAmount
      stage
      matchDetails @client
      bets(where: { sender: $connectedUser }) {
        id
        score
        amount
        claimed
        refunded
      }
      positions {
        id
        score
        bets
        amount
      }
    }
  }
`;

export const COMPLETED_MATCHES = gql`
  query GetCompletedtMatches(
    $deadline: BigInt
    $connectedUser: String
    $skip: Int
    $first: Int!
  ) {
    matches(
      where: { stage_not: "Created" }
      orderBy: deadline
      orderDirection: "desc"
      skip: $skip
      first: $first
      queryId: 1
    ) {
      id
      uri
      scoreMultiple
      winningScore
      totalBets
      totalAmount
      rewardAmount
      stage
      matchDetails @client
      bets(where: { sender: $connectedUser }) {
        id
        score
        amount
        claimed
        refunded
      }
      positions {
        id
        score
        bets
        amount
      }
    }
  }
`;

export const MATCH = gql`
  query GetMatch($id: String!) {
    match(id: $id) {
      id
      uri
      minScore
      scoreMultiple
      deadline
      winningScore
      totalBets
      totalAmount
      rewardAmount
      stage
      matchDetails @client
      bets(where: { sender: $connectedUser }) {
        id
        score
        amount
        claimed
        refunded
      }
      positions {
        id
        score
        bets
        amount
      }
    }
  }
`;
