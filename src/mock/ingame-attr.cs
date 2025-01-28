// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Ability
    {
        public string identifier { get; set; }
        public string displayName { get; set; }
        public string slot { get; set; }
        public int totalCooldown { get; set; }
        public int cooldown { get; set; }
        public int level { get; set; }
        public int charges { get; set; }
        public Assets assets { get; set; }
    }

    public class Assets
    {
        public string spellName { get; set; }
        public string iconAsset { get; set; }
        public string iconName { get; set; }
    }

    public class BaronPitTimer
    {
        public int timeTotal { get; set; }
        public double timeLeft { get; set; }
        public string subType { get; set; }
        public object mapSide { get; set; }
    }

    public class BaronPowerPlay
    {
        public int gold { get; set; }
        public int kills { get; set; }
        public int deaths { get; set; }
        public int timeLeft { get; set; }
        public int timeTotal { get; set; }
    }

    public class Champion
    {
        public int id { get; set; }
        public string alias { get; set; }
        public string name { get; set; }
        public string splashCenteredImg { get; set; }
        public string splashImg { get; set; }
        public string loadingImg { get; set; }
        public string squareImg { get; set; }
    }

    public class ChampionAssets
    {
        public int id { get; set; }
        public string alias { get; set; }
        public string name { get; set; }
        public string splashCenteredImg { get; set; }
        public string splashImg { get; set; }
        public string loadingImg { get; set; }
        public string squareImg { get; set; }
    }

    public class DragonPitTimer
    {
        public int timeTotal { get; set; }
        public double timeLeft { get; set; }
        public string subType { get; set; }
        public object mapSide { get; set; }
    }

    public class FeatsOfStrength
    {
        public bool hasFeatsOfStrength { get; set; }
        public int turrets { get; set; }
        public bool turretsWasFirst { get; set; }
        public int kills { get; set; }
        public bool killsWasFirst { get; set; }
        public int objectives { get; set; }
        public bool objectivesWasFirst { get; set; }
    }

    public class Health
    {
        public int current { get; set; }
        public int max { get; set; }
        public int shield { get; set; }
        public int physicalShield { get; set; }
        public int magicalShield { get; set; }
    }

    public class Inhibitor
    {
        public string team { get; set; }
        public int teamid { get; set; }
        public int side { get; set; }
        public List<Inhibitor> inhibitors { get; set; }
        public int timeTotal { get; set; }
        public double timeLeft { get; set; }
        public string subType { get; set; }
        public object mapSide { get; set; }
    }

    public class Item
    {
        public int id { get; set; }
        public string displayName { get; set; }
        public string asset { get; set; }
        public object modifier { get; set; }
        public int cost { get; set; }
        public int count { get; set; }
        public int combineCost { get; set; }
        public List<object> stats { get; set; }
        public int cooldown { get; set; }
        public int maxCooldown { get; set; }
        public int stacks { get; set; }
        public int visionScore { get; set; }
    }

    public class Perk
    {
        public int id { get; set; }
        public string name { get; set; }
        public string iconPath { get; set; }
    }

    public class Player
    {
        public string id { get; set; }
        public string playerName { get; set; }
        public string playerHashtag { get; set; }
        public ChampionAssets championAssets { get; set; }
        public List<Ability> abilities { get; set; }
        public List<Perk> perks { get; set; }
        public Health health { get; set; }
        public Resource resource { get; set; }
        public int? stacksData { get; set; }
        public bool hasBaron { get; set; }
        public bool hasElder { get; set; }
        public int level { get; set; }
        public double experienceToNextlevel { get; set; }
        public Champion champion { get; set; }
        public string name { get; set; }
        public int kills { get; set; }
        public int deaths { get; set; }
        public int assists { get; set; }
        public int gold { get; set; }
        public int totalGold { get; set; }
        public int creepScore { get; set; }
        public int visionScore { get; set; }
        public int shutdown { get; set; }
        public object respawnTimeRemaining { get; set; }
        public bool hasFeatsOfStrength { get; set; }
        public List<Item> items { get; set; }
    }

    public class Resource
    {
        public string type { get; set; }
        public int current { get; set; }
        public int max { get; set; }
    }

    public class Root
    {
        public string type { get; set; }
        public State state { get; set; }
    }

    public class Scoreboard
    {
        public List<Team> teams { get; set; }
        public int gameTime { get; set; }
        public int bestOf { get; set; }
    }

    public class ScoreboardBottom
    {
        public int gameTime { get; set; }
        public List<Team> teams { get; set; }
    }

    public class SeriesScore
    {
        public int wins { get; set; }
        public int losses { get; set; }
    }

    public class State
    {
        public int gameTime { get; set; }
        public object patch { get; set; }
        public object gameVersion { get; set; }
        public string gameStatus { get; set; }
        public Scoreboard scoreboard { get; set; }
        public List<Tab> tabs { get; set; }
        public ScoreboardBottom scoreboardBottom { get; set; }
        public BaronPitTimer baronPitTimer { get; set; }
        public object atakhanTimer { get; set; }
        public DragonPitTimer dragonPitTimer { get; set; }
        public List<Inhibitor> inhibitors { get; set; }
    }

    public class Tab
    {
        public int id { get; set; }
        public List<Player> players { get; set; }
    }

    public class Team
    {
        public string teamName { get; set; }
        public string teamTag { get; set; }
        public string teamIconUrl { get; set; }
        public SeriesScore seriesScore { get; set; }
        public TotalScore totalScore { get; set; }
        public string infoText { get; set; }
        public int gold { get; set; }
        public int kills { get; set; }
        public int towers { get; set; }
        public int grubs { get; set; }
        public List<string> dragons { get; set; }
        public object atakhan { get; set; }
        public BaronPowerPlay baronPowerPlay { get; set; }
        public object dragonPowerPlay { get; set; }
        public FeatsOfStrength featsOfStrength { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string tag { get; set; }
        public List<Player> players { get; set; }
    }

    public class TotalScore
    {
        public int wins { get; set; }
        public int losses { get; set; }
    }

