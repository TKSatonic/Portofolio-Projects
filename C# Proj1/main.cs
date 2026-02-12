using datal;
using System.IO;

var (data, Ldata) = DataLoader.InitialiseGame();
Console.WriteLine(Ldata.Chance.HP);
Console.WriteLine(data.Mob.Atk);
Console.WriteLine($"Player's Def is: {data.Player.Def_Base}");
Console.WriteLine($"Player's Atk is: {data.Player.Atk_Base}");



