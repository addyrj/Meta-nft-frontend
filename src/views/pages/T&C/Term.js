import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
    "& p": {
      color: "#fff",
      marginBottom: "10px",
    },
    "& h5": {
      marginBottom: "10px",
      marginTop: "20px",
      color: "#fff"
    },
    "& li": {
      color: "#fff",
      marginBottom: "10px",
      fontSize: "14px",
    },
  },
  heading: {
    textAlign: "start",
    "& h1": {
      color: "#fff",
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  details: {
    "& h4": {
      fontSize: "15px",
      lineHeight: "25px",
    },
  },
  colorbox: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    padding: "10px",
    background:
      " linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid #A8CEDF",
    backdropFilter: "blur(42px)",
  },
}));
const Privacy = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box className={classes.heading}>
          <Typography variant="h1">Terms of Use</Typography>
        </Box>
        <Box className={classes.details} mt={2}>
          <Typography variant="h5">Effective as of 02/15/2022</Typography>
          <Typography variant="body2">
            Welcome to the QIE’s Terms of Use agreement. For purposes of this
            agreement, “Site” refers to the Company’s website, which can be
            accessed at{" "}
            <a
              href="https://qiblockchain.online"
              target="_blank"
              style={{ color: "#3db0f3" }}
            >
              https://qiblockchain.online
            </a>{" "}
            “Service” refers to the Company’s services accessed via the Site, in
            which users can create
          </Typography>
          <Typography variant="body2">
            non-fungible tokens on the QIE Blockchain and upload user created
            content to our servers and other third-party affiliates. The terms
            “we,” “us,” and “our” refer to the Company.
          </Typography>
          <Typography variant="body2">
            Please review the following terms carefully. By accessing or using
            the Service, you signify your agreement to these Terms of Use. If
            you do not agree to be bound by these Terms of Use in their
            entirety, you may not access or use the Service.
          </Typography>
          {/* 
          <Typography variant="h5">How we use your information</Typography>
          <Typography variant="body2">
            We use the information we collect in various ways, including to:
          </Typography> */}
          <ul>
            <li>
              YOU ARE GRANTING NftTokenABI, ITS AFFILIATES AND ITS BUSINESS
              PARTNERS (AS DEFINED BELOW) THE RIGHT TO USE YOUR CONTENT (DEFINED
              BELOW) ON THEIR WEBSITES, SOCIAL MEDIA PLATFORMS AND RETAILER
              WEBSITES, AS WELL AS IN OTHER FORMS, MEDIA AND/OR DISTRIBUTION
              METHODS AS DESCRIBED BELOW, INDEFINITELY
            </li>
            <li>
              YOU CREATED THE CONTENT OR HAVE PERMISSION FROM THE CREATOR OF THE
              CONTENT TO GRANT THE RIGHT TO USE THE CONTENT • YOU HAVE ALL
              NECESSARY RIGHTS AND PERMISSIONS TO GRANT THE RIGHT TO USE THE
              CONTENT WITH RESPECT TO ALL INDIVIDUALS APPEARING IN THE CONTENT
            </li>
            <li>
              YOU UNDERSTAND THAT ANY CONTENT THAT VIOLATES THESE TERMS OF
              SERVICE, ANY LOCAL LAWS, INTERNATIONAL LAWS, REGULATIONS, OR
              POLICIES CAN AND WILL BE REMOVED FROM THE NftTokenABI PLATFORM.
            </li>
            <li>
              YOU ARE AT LEAST 13 YEARS OF AGE OR THE AGE OF MAJORITY, WHICHEVER
              IS OLDER, IN YOUR STATE AND/OR COUNTRY OF RESIDENCE. PRIVACY
              POLICY
            </li>
          </ul>
          <Typography variant="body2">
            The Company respects the privacy of its Service users. Please refer
            to the Company’s Privacy Policy, which explains how we collect, use,
            and disclose information that pertains to your privacy. When you
            access or use the Service, you signify your agreement to the Privacy
            Policy as well as these Terms of Use.
          </Typography>
          <Typography variant="h5">ABOUT THE SERVICE</Typography>
          <Typography variant="body2">
            The Service allows you to create non-fungible tokens on the QIE
            Blockchain and upload user created content to our servers and other
            third-party affiliates, manage existing non-fungible tokens made on
            The Service, or made on other third-party services, browse
            non-fungible tokens created on the QIE Blockchain, and transact
            between two parties by selling non-fungible tokens.
          </Typography>
          <Typography variant="h5">
            REGISTRATION RULES FOR USER CONDUCT AND USE OF THE SERVICE
          </Typography>
          <Typography variant="body2">
            You need to be at least 13 years old and not a resident of the
            United States to register for and use the Service.
          </Typography>
          <Typography variant="body2">
            <strong>1.</strong> {""}If you are a user who signs up for the
            Service, you will create a personalized account which includes a
            unique username and a password to access the Service and to receive
            messages from the Company. You agree to notify us immediately of any
            unauthorized use of your password and/or account. The Company will
            not be responsible for any liabilities, losses, or damages arising
            out of the unauthorized use of your member name, password and/or
            account.
          </Typography>
          <Typography variant="body2">
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites.
          </Typography>
          <Typography variant="h5">USE RESTRICTIONS</Typography>
          <Typography variant="body2">
            Your permission to use the Site is conditioned upon the following
            use, posting and conduct restrictions:
          </Typography>
          <Typography variant="body2">
            You agree that you will not under any circumstances:
          </Typography>
          <ul>
            <li>
              Access the Service for any reason other than your personal,
              non-commercial use solely as permitted by the normal functionality
              of the Service,
            </li>
            <li>
              Collect or harvest any personal data of any user of the Site or
              the Service · use the Site or the Service for the solicitation of
              business in the course of trade or in connection with a commercial
              enterprise
            </li>
            <li>
              Distribute any part or parts of the Site or the Service without
              our explicit written permission (we grant the operators of public
              search MarketplaceABIs permission to use spiders to copy materials
              from the site for the sole purpose of creating publicly-available
              searchable indices but retain the right to revoke this permission
              at any time on a general or specific basis)
            </li>
            <li>
              Use the Service for any unlawful purpose or for the promotion of
              illegal activities
            </li>

            <li>
              Attempt to, or harass, abuse or harm another person or group
            </li>

            <li>Use another user’s account without permission</li>
            <li>Intentionally allow another user to access your account</li>

            <li>
              Provide false or inaccurate information when registering an
              account · interfere or attempt to interfere with the proper
              functioning of the Service · make any automated use of the Site,
              the Service or the related systems, or take any action that we
              deem to impose or to potentially impose an unreasonable or
              disproportionately large load on our servers or network
              infrastructure · bypass any robot exclusion headers or other
              measures we take to restrict access to the Service, or use any
              software, technology, or device to scrape, spider, or crawl the
              Service or harvest or manipulate data
            </li>

            <li>
              Circumvent, disable or otherwise interfere with any
              security-related features of the Service or features that prevent
              or restrict use or copying of content, or enforce limitations on
              use of the Service or the content accessible via the Service or
            </li>
            <li>
              Publish or link to malicious content of any sort, including that
              intended to damage or disrupt another user’s browser or computer.
              Limitation of Liability In addition to any other limitation of
              liability set forth in these terms of use, you expressly agree
              that in no event shall the Service, its officers, directors,
              employees, contractors, affiliates, or agents be liable to you or
              any third party for: Any direct, indirect, punitive, incidental,
              special, consequential damages or any damages incurred by you,
              however caused and under any theory of liability. This shall
              include, but is not limited to lost profits (directly or
              indirectly), loss of data, loss of goodwill or business
              reputation, or other intangible loss
            </li>
          </ul>
          <Typography variant="body2">
            <strong>2.</strong> {""}Any loss or damage that may be incurred by
            you arising out of or in any way connected with the use or
            performance of the Website the delay or inability to use the Website
            the provision of or failure to provide services for any information,
            documents and publications obtained through the Website or otherwise
            arising out of the use of the Website Any loss or damage arising out
            of unauthorized access to or alteration of your transmissions of
            data and for any material or data sent or received or not sent or
            received and Any loss or damage arising out of any inaccuracies in
            the translation of information, documents and publications on the
            Service’s foreign language websites or for any misunderstandings
            resulting from differences in language usage, dialect or particular
            regional usage in such translations. The limitations on the
            Service’s liability apply even if the Service has been advised of or
            it should have been aware of the possibility that such losses or
            damages could arise.
          </Typography>
          <Typography variant="h5">Limitation of Liability</Typography>
          <Typography variant="body2">
            To the Full Extent Permitted by Law, in No Event Will Nfttokenabi Be
            Liable for Any Loss of Use, Lost or Inaccurate Data, Failure of
            Security Mechanisms, Interruption of Business, Cost of Procurement
            of Substitute Goods, Services or Technology or Any Indirect,
            Special, Incidental, or Consequential Damages of Any Kind (Including
            Lost Profits or Lost Data), Regardless of the Form of Action,
            Whether in Contract, Tort (Including Negligence), Strict Liability
            or Otherwise, Even if Informed of the Possibility of Such Damages in
            Advance. To the Full Extent Permitted by Law, in No Event Will
            hovr.site’s Aggregate Liability for Any and All Claims, Losses,
            Damages, Liabilities, Costs and Expenses (Including Reasonable
            Lawyer’s Fees) Arising From, in Connection With or Related to This
            Agreement, the Apis or the Content Exceed the Portion of the Fees
            Received by hovr.site in the Three (3) Months Prior to Such Claim.
            Notwithstanding Anything to the Contrary, hovr.site Has No Warranty,
            Indemnification or Other Obligation or Liability With Respect to the
            Client's Product or Its Combination, Interaction, or Use With Any
            Minting Services or the Apis.
          </Typography>
          <Typography variant="body2">
            <Typography variant="body2">
              The Client acknowledges and agrees that this Clause reflects a
              reasonable allocation of risk and that hovr.site would not have
              entered into this Agreement without these liability limitations.
              This Clause will survive notwithstanding any limited remedy’s
              failure of essential purpose.
            </Typography>
          </Typography>
          <Typography variant="h5">Indemnity</Typography>
          <Typography variant="body2">
            The Client agrees that hovr.site and its affiliates and their
            respective shareholders, directors, officers, employees,
            representatives, agents, contractors, customers and licensees
            (collectively, the "Indemnified Parties") shall have no liability
            whatsoever for, and the Client shall indemnify and hold harmless the
            Indemnified Parties from and against, any and all claims, losses,
            damages, liabilities, costs and expenses (including reasonable
            lawyer’s fees) arising from, in connection with or related to:
          </Typography>
          <ul>
            <li>
              Any use the Client or its end users makes of the API, the Content
              or the Minting Services
            </li>
            <li>
              The Client’s relationships or interactions with any end users or
              third-party distributors of the Client's Product
            </li>
            <li>The Client's Product</li>
            <li>He Client’s breach of the terms of this Agreement or</li>
            <li>
              The gross negligence, wilful misconduct or fraud of the Client,
              its affiliates and their respective shareholders, directors,
              officers, employees, representatives, agents, contractors,
              customers and licensees.
            </li>
          </ul>
          <Typography variant="h5">POSTING AND CONDUCT RESTRICTIONS</Typography>
          <Typography variant="body2">
            When you create your own personalized account, you may be able to
            generate content in the form of non-fungible tokens on the QIE
            Blockchain (“User Content”) from using the Service. You are solely
            responsible for the User Content that you post, upload, link to or
            otherwise make available via the Service. You agree that we are only
            acting as a passive conduit for your online distribution and
            publication of your User Content. The Company, however, reserves the
            right to remove any User Content from the Service at its sole
            discretion. We grant you permission to use and access the Service,
            subject to the following express conditions surrounding User
            Content. You agree that failure to adhere to any of these conditions
            constitute a material breach of these Terms. By transmitting and
            submitting any User Content while using the Service, you agree as
            follows:
          </Typography>
          <ul>
            <li>
              You are solely responsible for your account and the activity that
              occurs while signed in to or while using your account
            </li>
            <li>
              You will not post information that is malicious, libellous, false
              or inaccurate · You will not post any information that is abusive,
              threatening, obscene, defamatory, libellous, or racially,
              sexually, religiously, or otherwise objectionable and offensive ·
              You retain all ownership rights in your User Content but you are
              required to grant the following rights to the Site and to users of
              the Service as set forth more fully under the “License Grant” and
              “Intellectual Property” provisions below: When you upload or post
              User Content to the Site or the Service, you grant to the Site a
              worldwide, non-exclusive, royalty free, transferable license to
              use, reproduce, distribute, prepare derivative works of, display,
              and perform that Content in connection with the provision of the
              Service and you grant to each user of the Service, a worldwide,
              non-exclusive, royalty-free license to access your User Content
              through the Service, and to use, reproduce, distribute, prepare
              derivative works of, display and perform such Content to the
              extent permitted by the Service and under these Terms of Use · You
              will not submit content that is copyrighted or subject to third
              party proprietary rights, including privacy, publicity, trade
              secret, or others, unless you are the owner of such rights
            </li>
          </ul>
          <Typography variant="body2">
            <strong>3.</strong> {""}or have the appropriate permission from
            their rightful owner to specifically submit such content and
          </Typography>
          <ul>
            <li>
              You hereby agree that we have the right to determine whether your
              User Content submissions are appropriate and comply with these
              Terms of Service, remove any and/or all of your submissions, and
              terminate your account with or without prior notice. You
              understand and agree that any liability, loss or damage that
              occurs as a result of the use of any User Content that you make
              available or access through your use of the Service is solely your
              responsibility. The Site is not responsible for any public display
              or misuse of your User Content. The Site does not, and cannot,
              pre-screen or monitor all User Content. However, at our
              discretion, we, or technology we employ, may monitor and/or record
              your interactions with the Service or with other Users. ONLINE
              CONTENT DISCLAIMER Opinions, advice, statements, offers, or other
              information or content made available through the Service, but not
              directly by the Site, are those of their respective authors, and
              should not necessarily be relied upon. Such authors are solely
              responsible for such content. We do not guarantee the accuracy,
              completeness, or usefulness of any information on the Site or the
              Service nor do we adopt nor endorse, nor are we responsible for,
              the accuracy or reliability of any opinion, advice, or statement
              made by other parties. We take no responsibility and assume no
              liability for any User Content that you or any other user or third
              party posts or sends via the Service. Under no circumstances will
              we be responsible for any loss or damage resulting from anyone’s
              reliance on information or other content posted on the Service, or
              transmitted to users.
            </li>
            <li>
              Though we strive to enforce these Terms of Use, you may be exposed
              to User Content that is inaccurate or objectionable when you use
              or access the Site or the Service. We reserve the right, but have
              no obligation, to monitor the materials posted in the public areas
              of the Site or the Service or to limit or deny a user’s access to
              the Service or take other appropriate action if a user violates
              these Terms of Use or engages in any activity that violates the
              rights of any person or entity or which we deem unlawful,
              offensive, abusive, harmful or malicious. The Company shall have
              the right to remove any material that in its sole opinion
              violates, or is alleged to violate, the law or this agreement or
              which might be offensive, or that might violate the rights, harm,
              or threaten the safety of users or others. Unauthorized use may
              result in criminal and/or civil prosecution under Federal, State
              and local law. If you become aware of a misuse of our Service or
              violation of these Terms of Use, please contact us{" "}
              <a href="mailto:info@hovr.site" style={{ color: "#3db0f3" }}>
                {" "}
                info@hovr.site
              </a>{" "}
              LINKS TO OTHER SITES AND/OR MATERIALS As part of the Service, we
              may provide you with convenient links to third party website(s)
              (“Third Party Sites”) as well as content or items belonging to or
              originating from third parties (the “Third Party Applications,
              Software or Content”). These links are provided as a courtesy to
              Service subscribers. We have no control over Third Party Sites or
              Third Party Applications, Software or Content or the promotions,
              materials, information, goods or services available on these
              Third-Party Sites or Third-Party Applications, Software or
              Content. Such Third-Party Sites and Third-Party Applications,
              Software or Content are not investigated, monitored or checked for
              accuracy, appropriateness, or completeness, and we
            </li>
          </ul>
          <Typography variant="body2">
            <strong>4.</strong> {""}Are not responsible for any Third-Party
            Sites accessed through the Site or any Third Party Applications,
            Software or Content posted on, available through or installed from
            the Site, including the content, accuracy, offensiveness, opinions,
            reliability, privacy practices or other policies of or contained in
            the Third Party Sites or the Third Party Applications, Software or
            Content. Inclusion of, linking to or permitting the use or
            installation of any Third Party Site or any Third Party
            Applications, Software or Content does not imply our approval or
            endorsement. If you decide to leave the Site and access the Third
            Party Sites or to use or install any Third Party Applications,
            Software or Content, you do so at your own risk and you should be
            aware that our terms and policies, including these Terms of Use, no
            longer govern. You should review the applicable terms and policies,
            including privacy and data gathering practices, of any Third Party
            Site to which you navigate from the Site or relating to any
            applications you use or install from the Third Party Site.
          </Typography>
          <Typography variant="h5">
            COPYRIGHT COMPLAINTS AND COPYRIGHT AGENT
          </Typography>
          <Typography variant="body2">
            <strong>a.</strong> {""}Termination of Repeat Infringer Accounts. We
            respect the intellectual property rights of others and requires that
            the users do the same. Pursuant to 17 U.S.C. 512
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                Of the United States Copyright Act, we have adopted and
                implemented a policy that provides for the termination in
                appropriate circumstances of users of the Service who are repeat
                infringers. We may terminate access for participants or users
                who are found repeatedly to provide or post protected third
                party content without necessary rights and permissions.
              </li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <strong>b.</strong> {""}DMCA Take-Down Notices. If you are a
            copyright owner or an agent thereof and believe, in good faith, that
            any materials provided on the Service infringe upon your copyrights,
            you may submit a notification pursuant to the Digital Millennium
            Copyright Act (see 17 U.S.C 512) (“DMCA”) by sending the following
            information in writing to our designated copyright agent at
            info@hovr.site
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>The date of your notification</li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                A physical or electronic signature of a person authorized to act
                on behalf of the owner of an exclusive right that is allegedly
                infringed
              </li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                A description of the copyrighted work claimed to have been
                infringed, or, if multiple copyrighted works at a single online
                site are covered by a single notification, a representative list
                of such works at that site
              </li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                Information reasonably sufficient to permit the service provider
                to contact you, such as an address, telephone number, and/or
                email address
              </li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                A description of the material that is claimed to be infringing
                or to be the subject of infringing activity and information
                sufficient to enable us to locate such work
              </li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                A statement that you have a good faith belief that use of the
                material in the manner complained of is not authorized by the
                copyright owner, its agent, or the law and statement that the
                information in the notification is accurate, and under penalty
                of perjury, that you are authorized to act on behalf of the
                owner of an exclusive right that is allegedly infringed.
              </li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <strong>c.</strong> {""} Counter-Notices. If you believe that your
            User Content that has been removed from the Site is not infringing,
            or that you have the authorization from the copyright owner, the
            copyright owner's agent, or pursuant to the law, to post and use the
            content in your User Content, you may send a counter-notice
            containing the following information to our copyright agent using
            the contact information set forth above:
          </Typography>
          <Typography variant="body2">
            <ul>
              <li> Your physical or electronic signature</li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                A description of the content that has been removed and the
                location at which the content appeared before it was removed
              </li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                {" "}
                A statement that you have a good faith belief that the content
                was removed as a result of mistake or a misidentification of the
                content and{" "}
              </li>
            </ul>
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                {""} Your name, address, telephone number, and email address, a
                statement that you consent to the jurisdiction of the federal
                court in California, USA, and a statement that you will accept
                service of process from the person who provided notification of
                the alleged infringement. If a counter-notice is received by our
                copyright agent, we may send a copy of the counter notice to the
                original complaining party informing such person that it may
                reinstate the removed content in ten (10) business days. Unless
                the copyright owner files an action seeking a court order
                against the content provider, member or user, the removed
                content may (in our sole discretion) be reinstated on the Site
                in ten (10) to fourteen (14) business days or more after receipt
                of the counter-notice.{" "}
              </li>
            </ul>
          </Typography>
          <Typography variant="h5">LICENSE GRANT</Typography>
          <Typography variant="body2">
            By posting any User Content via the Service, you expressly grant,
            and you represent and warrant that you have a right to grant, to the
            Company a royalty-free, sublicensable, transferable, perpetual,
            irrevocable, non-exclusive, worldwide license to use, reproduce,
            modify, publish, list information regarding, edit, translate,
            distribute, publicly perform, publicly display, and make derivative
            works of all such User Content and your name, voice, and/or likeness
            as contained in your User Content, if applicable, in whole or in
            part, and in any form, media or technology, whether now known or
            hereafter developed, for use in connection with the Service.
          </Typography>
          <Typography variant="h5">INTELLECTUAL PROPERTY</Typography>
          <Typography variant="body2">
            You acknowledge and agree that we and our licensors retain ownership
            of all intellectual property rights of any kind related to the
            Service, including applicable copyrights, trademarks and other
            proprietary rights. Other product and company names that are
            mentioned on the Service may be trademarks of their respective
            owners. We reserve all rights that are not expressly granted to you
            under these Terms of Use. EMAIL MAY NOT BE USED TO PROVIDE NOTICE
            Communications made through the Service’s email and messaging system
            will not constitute legal notice to the Site, the Service, or any of
            its officers, employees, agents or representatives in any situation
            where legal notice is required by contract or any law or regulation.
            USER CONSENT TO RECEIVE COMMUNICATIONS IN ELECTRONIC FORM For
            contractual purposes, you:{" "}
          </Typography>
          <ul>
            <li>
              {" "}
              consent to receive communications from us in an electronic form
              via the email address you have submitted
            </li>
          </ul>{" "}
          <ul>
            <li>
              {" "}
              agree that all Terms of Use, agreements, notices, disclosures, and
              other communications that we provide to you electronically satisfy
              any legal requirement that such communications would satisfy if it
              were in writing. The foregoing does not affect your non-waivable
              rights. We may also use your email address to send you other
              messages, including information about the Site or the Service and
              special offers. You may opt out of such email by changing{" "}
            </li>
          </ul>{" "}
          <Typography variant="body2">
            <strong>6.</strong> {""} your account settings, using the
            “Unsubscribe” link in the message, or by sending an email to
            info@hovr.site Opting out may prevent you from receiving messages
            regarding the Site, the Service or special offers. WARRANTY
            DISCLAIMER THE SERVICE, IS PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY
            KIND. WITHOUT LIMITING THE FOREGOING, WE EXPRESSLY DISCLAIM ALL
            WARRANTIES, WHETHER EXPRESS, IMPLIED OR STATUTORY, REGARDING THE
            SERVICE INCLUDING WITHOUT LIMITATION ANY WARRANTY OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, SECURITY,
            ACCURACY AND NON INFRINGEMENT. WITHOUT LIMITING THE FOREGOING, WE
            MAKE NO WARRANTY OR REPRESENTATION THAT ACCESS TO OR OPERATION OF
            THE SERVICE WILL BE UNINTERRUPTED OR ERROR FREE. YOU ASSUME FULL
            RESPONSIBILITY AND RISK OF LOSS RESULTING FROM YOUR DOWNLOADING
            AND/OR USE OF FILES, INFORMATION, CONTENT OR OTHER MATERIAL OBTAINED
            FROM THE SERVICE. SOME JURISDICTIONS LIMIT OR DO NOT PERMIT
            DISCLAIMERS OF WARRANTY, SO THIS PROVISION MAY NOT APPLY TO YOU.
          </Typography>
          <Typography variant="body2">
            LIMITATION OF DAMAGES RELEASE TO THE EXTENT PERMITTED BY APPLICABLE
            LAW, IN NO EVENT SHALL THE SITE, THE SERVICE, ITS AFFILIATES,
            DIRECTORS, OR EMPLOYEES, OR ITS LICENSORS OR PARTNERS, BE LIABLE TO
            YOU FOR ANY LOSS OF PROFITS, USE, OR DATA, OR FOR ANY INCIDENTAL,
            INDIRECT, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, HOWEVER
            ARISING, THAT RESULT FROM:
          </Typography>
          <ul>
            <li> THE USE, DISCLOSURE, OR DISPLAY OF YOUR USER CONTENT</li>
          </ul>
          <ul>
            <li> YOUR USE OR INABILITY TO USE THE SERVICE </li>
          </ul>{" "}
          <ul>
            <li>
              THE SERVICE GENERALLY OR THE SOFTWARE OR SYSTEMS THAT MAKE THE
              SERVICE AVAILABLE OR{" "}
            </li>
          </ul>{" "}
          <ul>
            <li>
              ANY OTHER INTERACTIONS WITH USE OR WITH ANY OTHER USER OF THE
              SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
              NEGLIGENCE) OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT WE HAVE
              BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A
              REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL
              PURPOSE. SOME JURISDICTIONS LIMIT OR DO NOT PERMIT DISCLAIMERS OF
              LIABILITY, SO THIS PROVISION MAY NOT APPLY TO YOU.
            </li>
          </ul>{" "}
          <Typography variant="body2">
            If you have a dispute with one or more users, a restaurant or a
            merchant of a product or service that you review using the Service,
            you release us (and our officers, directors, agents, subsidiaries,
            joint ventures and employees) from claims, demands and damages
            (actual and consequential) of every kind and nature, known and
            unknown, arising out of or in any way connected with such disputes.
            If you are a California resident using the Service, you may
            specifically waive California Civil Code §1542, which says: “A
            general release does not extend to claims which the creditor does
            not know or suspect to exist in his favour at the time of executing
            the release, which if known by him must have materially affected his
            settlement with the debtor.”
          </Typography>
          <Typography variant="h5">MODIFICATION OF TERMS OF USE</Typography>
          <Typography variant="body2">
            <strong>7.</strong> {""} We can amend these Terms of Use at any time
            and will update these Terms of Use in the event of any such
            amendments. It is your sole responsibility to check the Site from
            time to time to view any such changes in this agreement. Your
            continued use of the Site or the Service signifies your agreement to
            our revisions to these Terms of Use. We will endeavour to notify you
            of material changes to the Terms by posting a notice on our homepage
            and/or sending an email to the email address you provided to us upon
            registration. For this additional reason, you should keep your
            contact and profile information current. Any changes to these Terms
            (other than as set forth in this paragraph) or waiver of our rights
            hereunder shall not be valid or effective except in a written
            agreement bearing the physical signature of one of our officers. No
            purported waiver or modification of this agreement on our part via
            telephonic or email communications shall be valid.
          </Typography>
          <Typography variant="h5">GENERAL TERMS</Typography>
          <Typography variant="body2">
            <strong>8. </strong> {""}If any part of this Terms of Use agreement
            is held or found to be invalid or unenforceable, that portion of the
            agreement will be construed as to be consistent with applicable law
            while the remaining portions of the agreement will remain in full
            force and effect. Any failure on our part to enforce any provision
            of this agreement will not be considered a waiver of our right to
            enforce such provision. Our rights under this agreement survive any
            transfer or termination of this agreement.
          </Typography>
          <Typography variant="body2">
            You agree that any cause of action related to or arising out of your
            relationship with the Company must commence within ONE year after
            the cause of action accrues. Otherwise, such cause of action is
            permanently barred. These Terms of Use and your use of the Site are
            governed by the federal laws of the United States of America and the
            laws of the State of California, without regard to conflict of law
            provisions.
          </Typography>
          <Typography variant="body2">
            We may assign or delegate these Terms of Service and/or our Privacy
            Policy, in whole or in part, to any person or entity at any time
            with or without your consent. You may not assign or delegate any
            rights or obligations under the Terms of Service or Privacy Policy
            without our prior written consent, and any unauthorized assignment
            or delegation by you is void.
          </Typography>
          <Typography variant="body2">
            YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE, UNDERSTAND
            THE TERMS OF USE, AND WILL BE BOUND BY THESE TERMS AND CONDITIONS.
            YOU FURTHER ACKNOWLEDGE THAT THESE TERMS OF USE TOGETHER WITH THE
            PRIVACY POLICY AT{" "}
            <a
              href="https://qiblockchain.online"
              target="_blank"
              style={{ color: "#3db0f3" }}
            >
              https://qiblockchain.online
            </a>{" "}
            REPRESENT THE COMPLETE AND EXCLUSIVE STATEMENT OF THE AGREEMENT
            BETWEEN US AND THAT IT SUPERSEDES ANY PROPOSAL OR PRIOR AGREEMENT
            ORAL OR WRITTEN, AND ANY OTHER COMMUNICATIONS BETWEEN US RELATING TO
            THE SUBJECT MATTER OF THIS AGREEMENT.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Privacy;
