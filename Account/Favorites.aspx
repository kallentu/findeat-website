<%@ Page Title="Favorites" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Favorites.aspx.cs" Inherits="Account_Favorites"%>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <section>
        <!-- TODO: Make restaurants specific to user -->
        <h2>Favorite Restaurants</h2>
        <p>Welcome. You have successfully logged in.</p>
        <p>These are your favorite restaurants.</p>

        <!-- each restaurant expanded, collapsable drawers-->
        <!-- TODO: make restaurants deletable from database -->
        <!-- TODO: order restaurants -->
        <div>
            <asp:Label ID="restaurantInfo" runat="server"></asp:Label>
        </div>
    </section>
</asp:Content>

