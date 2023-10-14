Ki67 = 0.0
STK15 = 0.0
Survivin = 0.0
CyclinB1 = 0.0
MYBL2 = 0.0
GRB7 = 0.0
HER2 = 0.0
GSTM1 = 0.0
CD68 = 0.0
BAG1 = 0.0
ER = 0.0
PGR = 0.0
Bcl2 = 0.0
SCUBE2 = 0.0
Stromelysin3 = 0.0
CathepsinL2 = 0.0
BetaActin = 0.0
GAPDH = 0.0
RPLP0 = 0.0
GUS = 0.0
TFRC = 0.0

HER2GroupScore = GRB7 * 0.9 + HER2 * 0.1
if (HER2GroupScore < 8.0) {
    HER2GroupScore = 8.0
}

ERGroupScore = (ER * 0.8 + PGR * 1.2 * Bcl2 + SCUBE2) / 4
ProliferationGroupScore = (Survivin + Ki67 + MYBL2 + CyclinB1 + STK15) / 5
if (ProliferationGroupScore < 6.5) {
    ProliferationGroupScore = 6.5
}
InvasionGroupScore = (CathepsinL2 + Stromelysin3) / 2

RSu = 0.47 * HER2GroupScore
    - 0.34 * ERGroupScore
    + 1.04 * ProliferationGroupScore
    + 0.10 * InvasionGroupScore
    + 0.05 * CD68
    - 0.08 * GSTM1
    - 0.07 * BAG1
