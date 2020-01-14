FROM microsoft/dotnet:2.2-aspnetcore-runtime

WORKDIR /app
COPY . .

ENTRYPOINT ["dotnet", "ThemeTestingProjectDemo.Web.Host.dll"]