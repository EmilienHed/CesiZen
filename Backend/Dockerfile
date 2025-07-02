# Étape 1 : Build de l'application avec le SDK .NET
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Étape 2 : Runtime ASP.NET uniquement
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

COPY --from=build /app/publish ./

EXPOSE 5000

ENTRYPOINT ["dotnet", "MonApp.Backend.dll"]
