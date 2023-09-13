-- CreateTable
CREATE TABLE "Guild" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "prefix" TEXT DEFAULT '!'
);

-- CreateTable
CREATE TABLE "Setup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "textId" TEXT,
    "messageId" TEXT,
    CONSTRAINT "Setup_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "textId" TEXT,
    "voiceId" TEXT,
    CONSTRAINT "stay_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Botchannel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "textId" TEXT,
    CONSTRAINT "Botchannel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dj" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT,
    "mode" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Dj_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("guildId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    CONSTRAINT "Roles_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Dj" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "songs" TEXT,
    CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Premium" (
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    CONSTRAINT "Premium_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Premium_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tracks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trackId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "played" INTEGER NOT NULL DEFAULT 0,
    "guildId" TEXT NOT NULL,
    CONSTRAINT "Tracks_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("guildId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_guildId_key" ON "Guild"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Setup_guildId_key" ON "Setup"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "stay_guildId_key" ON "stay"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Botchannel_guildId_key" ON "Botchannel"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Dj_guildId_key" ON "Dj"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_roleId_key" ON "Roles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_guildId_key" ON "Roles"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_userId_name_key" ON "Playlist"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_userId_key" ON "Premium"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_guildId_key" ON "Premium"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Tracks_trackId_key" ON "Tracks"("trackId");
