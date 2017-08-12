<%@ Page Title="Favorites" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Favorites.aspx.cs" Inherits="Account_Favorites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <section>
        <!-- TODO: Make restaurants specific to user -->
        <h2>Favorite Restaurants</h2>
        <p>Welcome. You have successfully logged in.</p>
        <p>These are your favorite restaurants.</p>

        <!-- deletion form -->
        <div class="form-group form-inline">
            <label for="delete" class="sr-only">delete restaurant</label>
            <select class="form-control" id="deleteName" name="delete">
                <asp:Label ID="optionsServer" runat="server"></asp:Label>
            </select>
            <asp:Button ID="deleteEntry" runat="server" Text="delete" CssClass="btn btn-danger" OnClick="deleteDBEntry" onClientClick="return confirm('You are about to delete this favorite restaurant. \nAre you sure you want to delete this restaurant?');"/>
        </div>

        <!-- each restaurant expanded, collapsable drawers-->
        <asp:Label ID="restaurantInfo" runat="server"></asp:Label>

    </section>
</asp:Content>

