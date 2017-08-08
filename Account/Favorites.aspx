<%@ Page Title="Favorites" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Favorites.aspx.cs" Inherits="Account_Favorites"%>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <section>
        <h2>Favorite Restaurants</h2>
        <p>Welcome. You have successfully logged in.</p>
        <p>These are your favorite restaurants.</p>
        <div>
            <asp:Label ID="restaurantName" runat="server"></asp:Label>
        </div>
    </section>
</asp:Content>

