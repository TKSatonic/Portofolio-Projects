namespace datal;


using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;

public static class DataLoader 
{
    public static (GameData, LootData) InitialiseGame() 
    {
        string fileName = "data.json";
        string lootName = "loot.json";
        
        var options = new JsonSerializerOptions { TypeInfoResolver = AppJsonContext.Default };

        var data = JsonSerializer.Deserialize<GameData>(File.ReadAllText(fileName), options)!;
        var Ldata = JsonSerializer.Deserialize<LootData>(File.ReadAllText(lootName), options)!;

        return (data, Ldata); 
    }
}public class GameData
{
    public MobStats Mob { get; set;}
    public PlayerStats Player { get; set;}
}
public class MobStats
{
    public int Health { get; set;}
    public int Def { get; set;}

    public int Atk { get; set;}
}

public class PlayerStats
{
    public int Health_Base { get; set;}
    public int Def_Base { get; set;}
    public int Atk_Base { get; set;}
}

public class LootData
{
    public Checker Chance { get; set;}
}

public class Checker
{
    public int HP { get; set; }
}


[JsonSerializable(typeof(GameData))]
[JsonSerializable(typeof(LootData))]
internal partial class AppJsonContext : JsonSerializerContext
{
}