-- CreateEnum
CREATE TYPE "NatureType" AS ENUM ('FIRE', 'WATER', 'WIND', 'EARTH', 'LIGHTNING');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CHARACTER', 'CLAN', 'HOKAGE', 'KAZEKAGE', 'RAIKAGE', 'TSUCHIKAGE', 'MIZUKAGE', 'AKATSUKI', 'JINCHUURIKI', 'KEKKEI_GENKAI', 'BIJUU');

-- CreateEnum
CREATE TYPE "BijuuType" AS ENUM ('SHUKAKU', 'MATATABI', 'ISOBU', 'SON_GOKU', 'KOKUO', 'SAIKEN', 'CHOMEI', 'GYUKI', 'KURAMA', 'JUUBI');

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "natureType" "NatureType"[],
    "type" "Type"[],
    "clan" TEXT,
    "kekkeiGenkai" TEXT[],
    "bijuu" "BijuuType"[],

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "village" TEXT,
    "type" "Type"[],

    CONSTRAINT "Clan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bijuu" (
    "id" TEXT NOT NULL,
    "name" "BijuuType" NOT NULL,
    "image" TEXT NOT NULL,
    "history" TEXT,
    "jinchuurikis" TEXT[],
    "type" "Type"[],

    CONSTRAINT "Bijuu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kekkei_genkai" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "type" "Type"[],

    CONSTRAINT "kekkei_genkai_pkey" PRIMARY KEY ("id")
);
