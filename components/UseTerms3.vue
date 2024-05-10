<template>
  <v-row justify="center">
    <v-dialog v-model="show" hide-overlay transition="dialog-bottom-transition" content-class='modal-termins'>
      <v-card color="#33a9f2">
        <v-toolbar dark color="#33a9f2" height="80">
          <v-btn icon dark @click="show = false">
            <v-icon size="30"> mdi-arrow-left-circle </v-icon>
          </v-btn>
          <v-toolbar-items>
            <div class="container_IMG">
              <v-img width="200px" :src="require('~/assets/img/png/login/shareity_white.png')"></v-img>
            </div>
          </v-toolbar-items>
        </v-toolbar>

        <div class="center">
          <div class="content">
            <p style="margin-bottom: 50px;">
              Terms of Use <br /><br />
              Shareity is a social donation service (the “Service”) accessible
              via web browser at shareity.com (shareity.com) (for information) or
              app.shareity.com (to participate in a challenge) or
              members.shareity.com (Dashboard to manage challenge and user data)
              (collectively the “Site”) operated by Shareity Inc. in the United
              States. Your access to and use of the Service constitutes
              acceptance by you or the entity you represent (“User” of “Users”)
              of the following terms and conditions of use (the “Terms of
              Use”).<br /><br />
              There are a few definitions we’d like to get out of the way. A
              User is any individual who accesses the Site and uses the Service,
              regardless of whether it is on their own personal behalf or on the
              behalf of a Brand, Cause or Promoter. A User can be an individual
              challenge participant (“Participant”), an individual who
              contributes (“Sponsors”) a donation to a challenge campaign
              (“Cause”), the organizer of their own Cause or the (“Promoter”),
              marketing coordinator of campaigns. A Cause might more often be an
              organized not-for-profit, individual, charitable fund,
              governmental organization, or other entity but not necessarily so.
              A Verified Cause is one that has been verified via 501C3 status.
              Likewise, much of the time the Sponsor (“Brand”) of a challenge
              campaign will be a company, corporation, individual, government
              organization or charitable fund that has agreed to Sponsor the
              donation based on each Participant’s completion of the
              challenge.<br /><br />
              If you do not agree to these Terms of Use, you may not access or
              use the Service.<br /><br />
              The Service and Site are protected by intellectual property laws
              worldwide. Nothing in these Terms of Use shall be deemed to confer
              any third-party rights or benefits on any such content.<br /><br />
              The Service allows Participants to direct donations by Brands in
              support of selected Causes as displayed in the Service. You
              acknowledge that the Cause that may be listed in the Site has
              subscribed to the Services on their own, and that SHAREITY MAKES
              NO REPRESENTATION OR WARRANTY REGARDING ANY PURPOSE, ITS VALIDITY,
              TAX-EXEMPT STATUS, OR ACCURACY OF ANY INFORMATION ABOUT THE CAUSE.
              Only Causes that have subscribed and agreed to the Shareity
              Service may receive donations from a Participant’s use of the
              Service.<br /><br />
              A Participant does not have to contribute any funds themselves to
              participate in a challenge campaign, although they certainly may
              do so (becoming a “Sponsor”). We at Shareity have no role in or
              responsibility for the relationship between the Brand/Sponsor and
              the Cause nor do we guarantee fulfillment of the
              Brand/Sponsor/Promoter’s commitment to deliver the promised
              donations. Each Brand/Sponsor communicates directly with the Cause
              with respect to how and when the donation will be made, directly
              in our Shareity Dashboard. The Services provided under these Terms
              of Use are subject to payment of fees by the Brand to us (“Fees”).
              The amount of the Fees varies with each campaign, depending upon
              the members subscribed, actions, interactions, aggregate donation
              amount and the number of individual donations. The Fees that we
              charge a Brand are for management of the campaign and use of
              platform. We do not charge the Cause any fees for Brand Sponsored
              Challenges and neither request nor permit any deduction from the
              donation.<br /><br />
              Challenges are voluntary and elected. Shareity is not endorsing
              the use of the platform and or challenges for any other purpose
              other than raising money and/or awareness. Further Shareity does
              not protect or defend the integrity of any particular challenge,
              its purpose or outcome. Shareity does not recommend or take
              responsibility for any challenge ideas or their effects on
              society/users/causes/brands. Challenges should always be done with
              caution and awareness of surroundings, with regard to personal and
              public safety, property and human rights. Shareity is not liable
              for any damages or negative results from improper use of the
              platform by Users, Causes, Brands or Promoters, in connection with
              challenges or other promotional means. Always use caution when
              planning, implementing or participating in a challenge.<br /><br />
              By agreeing to these Terms of Use, each Brand commits to paying
              the Fees to Shareity directly via payment processor, credit card,
              bank transfer or certified check in the form of (“Credits”) at the
              beginning of every campaign. One Credit is required for every
              participant added to the database (participating in the
              challenge). Credits must be bought before a campaign can become
              active in the database and Site. Credits must be for the full
              amount of the campaign for total anticipated Users. For example:
              Brand wants to donate $10,000 at $1 per user – they must purchase
              10,000 Credits (total number or participants in the challenge).
              The price of credits may change based on demand and services
              provided. Credits can also be used to send out messages and
              rewards to users, buy Keywords, or start new campaigns. If Credits
              are not fully used in the intended campaign (campaign has ended or
              not reach a certain goal), they can be used in future campaigns,
              promotions, or outreach as they never expire.<br /><br />Participants
              may also receive benefits from a Brand, Cause, Promotor, or
              Shareity for completing a challenge (ie: rewards, messages, status
              ratings, SWAG). These rewards can be promotional material but
              cannot constitute SPAM. Shareity, a Brand, Cause, or Promoter may
              also conduct contests and/or sweepstakes through the Site, abiding
              by local governing laws and regulations.<br /><br />
              We expect that each participating Brand/Sponsor/Promoter will take
              every reasonable care to ensure that all donations and related
              transactions are conducted via a secure connection. However, the
              security of information and payments transmitted via the internet
              (outside of Shareity platform) cannot be guaranteed. The
              Participant and Cause each acknowledges and agrees that: (i)
              donations are at a Brand’s own discretion; and (ii) Shareity has
              no liability whatsoever for (a) any loss the Participant, Brand,
              or Cause may suffer if a Brand fails to fulfill its donation
              commitment or (b) if a third party obtains unauthorized access to
              any information provided by the User.<br /><br />
              By accepting these Terms of Use, each Brand/Sponsor commits and
              promises to deliver to the donation it has offered for each
              challenge campaign Cause. The donation commitment is described in
              each challenge campaign and set between the Brand and Cause during
              campaign Set Up. For example, a Brand may commit to deliver $1 for
              each Participant who completes a challenge or a Brand may commit
              to deliver a certain amount of goods or services to the Cause if a
              certain number of challenges are completed. The Brand must convey
              its donation in a reasonable time following completion or end of
              the challenge campaign. Shareity may block a Brand from
              participating in future challenge campaigns if there is reason to
              believe that a Brand has not fully delivered on its donation
              commitment.<br /><br />
              Each Brand and Cause licenses to Shareity any trademarks, trade
              names, logos and any other content it uploads to the Site for the
              challenge campaign (“Campaign Content”). Each Brand and Cause
              represents and warrants that it has all requisite rights to upload
              such content and shall indemnify Shareity for any expenses or
              losses arising from a third party’s claim that Campaign Content
              infringes its intellectual property rights.<br /><br />
              Each Brand, Cause, or Promoter is responsible for using the
              Shareity Site and the Services in compliance with all applicable
              laws. Shareity is not responsible for identifying, assessing, or
              informing Users of which laws may apply in their use of the Site
              and the Service. Each Brand and Cause shall indemnify Shareity for
              any expenses or losses arising from use of the Service in
              violation of the laws of a particular jurisdiction.<br /><br />
              Each Brand and Cause commits to participating in each challenge
              campaign for the duration of the campaign as specified in the
              campaign Set Up.<br /><br />
              Our collection, retention and use of personal information through
              the Service is described in the Privacy Notice.<br /><br />
              Causes and Brands that have access to User information collected
              during a challenge campaign must use personal information only as
              permitted in these Terms of Use and the Shareity Privacy Notice.
              The Service integrates third-party services such as Facebook and
              contains links to third-party webpages. Third-party services and
              webpages are not under our control and are subject to the
              respective third-party’s terms and conditions.<br /><br />
              The Service is provided “as is” and “as available”, without
              warranty of any kind, either express or implied, including,
              without limitation, warranties of merchantability, fitness for a
              particular purpose and non-infringement. We do not make any
              warranties or representations as to accuracy or completeness. We
              periodically change, improve or update the Service.<br /><br />
              The mention or omission of specific Brands, Promoters, Causes,
              Companies, their products or brand names in the Service or Site
              does not imply any endorsement or judgment on the part of
              Shareity.<br /><br />
              Shareity’s name and logo (the “Shareity Marks”) are the exclusive
              property of Shareity and are protected under US and international
              law. Unauthorized use of the Shareity Marks is prohibited. The
              Shareity Marks may not be reproduced or used in any manner without
              our prior written permission outside of the platform.<br /><br />
              We reserve the exclusive right in our sole discretion to (i)
              alter, limit or discontinue the Service in any respect; (ii) deny
              User access to the Service without notice; and (iii) modify these
              general Terms of Use.<br /><br />
              All Users agree to the following terms governing Shareity’s use of
              Cellular services:<br /><br />
              1. When Users opt-in to the service, Shareity will send User an
              SMS message with a link to the Shareity site. <br /><br />2. Users
              can cancel the SMS service at any time. Users can also text “STOP”
              to 16173560793 to irrevocably stop messages. After a User sends
              the SMS message “STOP” to Shareity, Shareity will send the User an
              SMS message to confirm that the User has been unsubscribed. After
              this, the User will no longer receive SMS messages from Shareity.
              If the User wants to join again, a User may sign up as the User
              did the first time and Shareity will start sending SMS messages to
              the User again. <br /><br />3. If at any time a User forgets what
              keywords are supported, User may text “HELP” to 16173560793 .
              After a User sends the SMS message “HELP” to Shareity, Shareity
              will respond with instructions on how to use our service as well
              as how to unsubscribe. <br /><br />4. Shareity is able to deliver
              messages to the following mobile phone carriers: Major carriers:
              AT&T, Verizon Wireless, Sprint, T-Mobile, MetroPCS, U.S. Cellular,
              Alltel, Boost Mobile, Nextel, and Virgin Mobile. Minor carriers:
              Alaska Communications Systems (ACS), Appalachian Wireless (EKN),
              Bluegrass Cellular, Cellular One of East Central IL (ECIT),
              Cellular One of Northeast Pennsylvania, Cincinnati Bell Wireless,
              Cricket, Coral Wireless (Mobi PCS), COX, Cross, Element Mobile
              (Flat Wireless), Epic Touch (Elkhart Telephone), GCI, Golden
              State, Hawkeye (Chat Mobility), Hawkeye (NW Missouri), Illinois
              Valley Cellular, Inland Cellular, iWireless (Iowa Wireless),
              Keystone Wireless (Immix Wireless/PC Man), Mosaic (Consolidated or
              CTC Telecom), Nex-Tech Wireless, NTelos, Panhandle Communications,
              Pioneer, Plateau (Texas RSA 3 Ltd), Revol, RINA, Simmetry (TMP
              Corporation), Thumb Cellular, Union Wireless, United Wireless,
              Viaero Wireless, and West Central (WCC or 5 Star Wireless).<br /><br />
              ***Carriers are not liable for delayed or undelivered messages***
              5. As always, message and data rates may apply for any messages
              sent to a User from Shareity and to Shareity from Users. 1 message
              per request. If User has any questions about their text plan or
              data plan, it is best to contact their wireless provider. For all
              questions about the services provided by this short code, Users
              can send an email to steve@shareity.com. <br /><br />6. If Users
              have any questions regarding privacy, please read our Privacy
              Notice<br /><br />
              USE OF THE SERVICES AND THE SITE IS AT YOUR SOLE RISK. INFORMATION
              TRANSMITTED THROUGH THE INTERNET IS NEVER COMPLETELY SECURE.
              NEITHER SHAREITY, NOR ANY OF SHAREITY’S OWNERS, EMPLOYEES,
              AFFILIATES, AGENTS, REPRESENTATIVES, OR LICENSORS (COLLECTIVELY,
              “SHAREITY ASSOCIATES”) SHALL BE LIABLE TO YOU OR ANY THIRD PARTY
              FOR ANY COMPENSATORY, DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
              EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR ATTORNEYS’ FEES,
              OR FOR LOST DATA OR LOST PROFIT, ARISING OUT OF YOUR USE OF THE
              SERVICES OR SITE OR INABILITY TO GAIN ACCESS TO OR USE THE
              SERVICES OR SITE OR OUT OF ANY BREACH OF ANY WARRANTY, EVEN IF
              SHAREITY OR A SHAREITY ASSOCIATE HAS BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES OR SUCH DAMAGES WERE FORESEEABLE.<br /><br />
              YOUR SOLE RIGHT AND REMEDY WITH RESPECT TO ANY DISPUTE WITH
              SHAREITY IS TO STOP USING THE SERVICES. BECAUSE SOME STATES OR
              JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
              LIABILITY FOR CONSEQUENTIAL, INCIDENTAL OR SPECIAL DAMAGES, IN
              SUCH STATES AND JURISDICTIONS LIABILITY IS LIMITED TO THE GREATEST
              EXTENT PERMITTED BY LAW. IF THE FOREGOING LIMITATIONS ARE
              UNENFORCEABLE, SHAREITY’S LIABILITY TO YOU UNDER THESE TERMS SHALL
              NOT EXCEED ONE US DOLLAR.<br /><br />
              THE SITE IS CONTROLLED, OPERATED AND ADMINISTERED BY SHAREITY FROM
              ITS OFFICES WITHIN THE UNITED STATES. SHAREITY MAKES NO WARRANTY
              OR REPRESENTATION THAT MATERIAL AVAILABLE THROUGH THE SITE IS
              LEGAL, APPROPRIATE, OR AVAILABLE FOR USE OUTSIDE THE UNITED
              STATES.<br /><br />
              The following is a partial list of prohibited activities on or
              through the Service and Site: (1) using a robot, spider, script,
              automated process, or manual process to “scrape” the Site’s
              listings or content; (2) taking any action that imposes an
              unreasonable or disproportionately large load on Shareity’s
              hardware or software infrastructure; (3) sending SPAM to Shareity
              users or others; (4) attempting to reverse engineer, decompile,
              disassemble or otherwise obtain the source code to the Site; (5)
              engaging in or promoting any illegal activities; (6) engaging in
              any activity that markets another business or attracts Shareity
              users to a third party; (7) submitting content that is offensive,
              obscene, harmful to minors, illegal, abusive, threatening,
              defamatory, or misleading; or (8) using the services if you are or
              wish to assist a person or entity who is on a Specially Designated
              National List of the U.S. Department of the Treasury Office of
              Foreign Asset Control (“OFAC”) or otherwise prohibited from
              accessing the U.S. financial system.<br /><br />
              Shareity respects the intellectual property rights of others and
              desires to offer a platform that contains no content that violates
              those rights. These Terms of Use require that information posted
              by Users be accurate, lawful and not in violation of the rights of
              third parties. To promote these objectives, we provide a process
              for submission of complaints concerning content posted by our
              Users.<br /><br />
              Please note that whether or not we disable access to or remove
              content, we may make a good faith attempt to forward the written
              notification, including the complainant’s contact information, to
              the User who posted the content and/or take other reasonable steps
              to notify the User that Shareity has received notice of an alleged
              violation of intellectual property rights or other content
              violation. It is also our policy, in appropriate circumstances and
              in our discretion, to disable and/or terminate the accounts of
              Users who infringe or repeatedly infringe the rights of others or
              otherwise post unlawful content.<br /><br />
              Any notice or counter-notice you submit must be truthful and must
              be submitted under penalty of perjury. A false notice or
              counter-notice may give rise to personal liability. You may
              therefore want to seek the advice of legal counsel before
              submitting a notice or a counter-notice.<br /><br />
              Pursuant to the Digital Millennium Copyright Act (17 U.S.C. §
              512), Shareity has implemented procedures for receiving written
              notification of claimed infringements. Shareity has also
              designated an agent to receive notices of claimed copyright
              infringement. If you believe in good faith that your copyright has
              been infringed, you may complete and submit a Notice of Copyright
              Infringement form or otherwise provide a written communication
              which contains: <br /><br />1. An electronic or physical signature
              of the person authorized to act on behalf of the owner of the
              copyright interest; <br /><br />2. A description of the
              copyrighted work that you claim has been infringed; <br /><br />3.
              A description specifying the location on our website of the
              material that you claim is infringing; <br /><br />4. Your email
              address and your mailing address and/or telephone number;
              <br /><br />5. A statement by you that you have a good faith
              belief that the disputed use is not authorized by the copyright
              owner, its agent, or the law; and <br /><br />6. A statement by
              you, made under penalty of perjury, that the information in your
              notice is accurate and that you are the copyright owner or
              authorized to act on the copyright owner’s behalf.
              <br /><br />Please submit your notice to our Copyright Agent as
              follows:<br /><br />
              steve@shareity.com<br /><br /><br />
              We reserve the right to seek all remedies available by law for any
              violation of these Terms of Use including any rights of Shareity
              in the Service and the Site. No waiver by Shareity of any
              provision of these Terms of Use shall be binding except as set
              forth in writing and signed by its duly authorized representative.
              Blocking a User from using the Service or the Site shall not limit
              Shareity’s other legal or equitable remedies for violation of
              these Terms of Use.<br /><br />
              These Terms of Use and any dispute arising therefrom shall be
              exclusively governed by the laws of the Commonwealth of
              Massachusetts, excluding its choice of law provisions. These Terms
              of Use and any Order Form completed between Shareity and each
              Brand, Cause or Promoter represents the entire agreement between
              Shareity and each User relating to the Services and the Site.
              These Terms of Use alone fully and completely expresses the
              agreement of the parties relating to the Services and the Site.
              There are no other courses of dealing, understanding, agreements,
              order forms, representations or warranties, written or oral,
              except as set forth herein. The integration of any Order Form
              within these Terms of Use is applicable only with respect to the
              parties executing such Order Form. Other persons, such as
              Participants, have no such Order Form incorporated within these
              Terms of Use, and any User is not considered a third party
              beneficiary of any Order Form.<br /><br />
              To the extent that there exists more than one language version of
              these Terms of Use and there is any inconsistency between the
              versions, the English version shall always prevail.<br /><br />
              If you have any questions about this Terms of Use, please contact
              us via steve@shareity.com<br /><br />
              Last updated: March 3, 2022<br /><br />

            </p>

            <!--  <v-icon style="    margin-bottom: 70px;
    margin-top: -70px;" color="#fff" x-large> mdi-play-circle </v-icon> -->
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const imgLink = require("@/assets/img/png/footer/icoLogo.png");
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
      image: imgLink,
      desserts: [
        {
          messages: "Related to pages you create or donations you make to keep you apprised of what’s happening on your page (or the page to which you donated) and to help you fundraise for that specific page, like donation notifications, target reach, fundraising tips and contests for active fundraisers to help you raise more for your",
          stop: "You can opt out here",
        },
        {
          messages: "Notifying all our users of important alerts related to the platform, like outages or security issues",
          stop: "You can opt out here",
        },
        {
          messages: "Containing marketing messages about other ways to Sponsor a Cause, like news and challenge competitions related to Causes, developments in our Services, and surveys. We only send these with your consent",
          stop: "To stop receiving them, click unsubscribe on any message (which takes you to your account notification page) or visit the account page directly Triggered by actions you take using the Services, like challenge creation and cancellation notification messages, you can’t opt out of these, but you won’t receive any unless you take an action on Shareity. To stop receiving these emails/text, just don’t take any actions on the platform",
        },
        {
          messages: "Containing communications we’re required to provide you by law, such as notices about data breaches We have to send these emails/text as required by law, as long as you have a  Shareity account. To stop receiving these emails, please contact us to delete your account.",
          stop: "To stop receiving these emails, please contact us to delete your account",
        },
        {
          messages: "Notifications",
          stop: "We offer challenge page creators the option to enable browser notifications from Shareity, which contain tips and information about their pages. Users can change preferences via profile/notifications link in Shareity web app and decide which content they want to receive. Further they can opt-out entirely via text by texting “STOP”. Causes/Brands/Promoters can change their preferences on browser notifications either by accessing their browser settings or visiting the Shareity Dashboard profile page",
        },
        {
          messages: "Making Shareity Better",
          stop: "We use aggregated and personal data about you and your use of our Services to develop and test better fundraising tools, to drive our research and development and to better understand our users and Cause/Brand/Promoter partners. Shareity does this analysis using a variety of data sources—URL links, transactional data (how you use the Services), click stream and log data (web traffic and Services usage), message data (how you respond to messages we send you), survey data, customer service data, and data you agree to share with us from your social media account. We may send you surveys about the Services, but you can opt out of receiving these and participation is completely voluntary",
        },
        {
          messages: "Advertising",
          stop: "Aside from sending marketing communications and promotional follow-ups, Sponsors and Brands may target ads to users and measure how they perform, both through our Services, such as on shareity.com (shareity.com), and through other channels like social networking sites and other websites. Once again Users can opt-out anytime",
        },
      ],
    };
  },
  created() {
    this.$nuxt.$on("UseTerms3", (option) => {
      this.show = option;
    });
  },
  methods: {
    toListenWidth() {
      return window.innerWidth
    },
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
  },
};
</script>
<style>
.modal-termins {
  width: 400px !important;
}

@media(max-width:600px) {
  .modal-termins {
    width: 100% !important;
    margin: 0px !important;
    height: 100%;
    overflow: hidden;
  }
}
</style>
<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  height: 100%;
  color: white;
  overflow: auto;
  width: 100%;
  padding: 20px;
  inline-size: auto;
}

.content p {
  line-height: 27px;
  font-weight: 600;
  font-size: 17px;
}

.container_IMG {
  display: flex;
  justify-content: center;
  align-items: center;
}

.T_img {
  width: 36px;
  height: 41px;
}

.center::-webkit-scrollbar {
  -webkit-appearance: none;
}

.center::-webkit-scrollbar:vertical {
  width: 10px;
}

.center::-webkit-scrollbar-button:increment,
.center::-webkit-scrollbar-button {
  display: none;
}

.center::-webkit-scrollbar:horizontal {
  height: 10px;
}

.center::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.center::-webkit-scrollbar-track {
  border-radius: 10px;
}
</style>