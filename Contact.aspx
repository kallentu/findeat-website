<%@ Page Title="Contact" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Contact.aspx.cs" Inherits="Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <section class="contact">
        <h2><%: Title %>.</h2>
        <p>if there are any questions or concerns about <strong>find.eat.</strong>, feel free to contact me.</p>

        <address>
            <strong>Email:</strong>   <a href="mailto:Support@example.com">kallentu@gmail.com</a><br />
        </address>

        <div class="btn-group">
            <a class="btn contact-button" href="https://www.github.com/kallentu">
                <i class="fa fa-github fa-2x" aria-hidden="true"></i>
            </a>
            <a class="btn contact-button" href="https://www.linkedin.com/in/kallen-t-7a463a100/">
                <i class="fa fa-linkedin fa-2x" aria-hidden="true"></i>
            </a>
        </div>
    </section>
</asp:Content>
