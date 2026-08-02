---
title: Codeforces Global Round 7 题解 (ABCDE)
date: 2020-03-20 19:46:00
permalink: /pages/25012e/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1326/)

## A. Bad Ugly Numbers

（~~第一题一看和数位 dp 某题贼像，其实是我看错了，而且看错好久~~）

我的方法是输出 $n-1$ 个 $5$ 和 $1$ 个 $4$，$n=1$ 特判一下。

统计了一下群里的方法：

433333

277777

333334

999998

333353

233333（强！）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
signed main(){
    ios::sync_with_stdio(0); cin.tie(0);
    ll t=read();
    while(t--){
        ll n=read();
        if(n==1)cout<<-1<<endl;
        else{
            repeat(i,1,n)cout<<'5';
            cout<<'4'<<endl;
        }
    }
    return 0;
}
```

## B. Maximums

模拟一下，具体略。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=200010;
ll a[N];
signed main(){
    ios::sync_with_stdio(0); cin.tie(0);
    int n=read();
    repeat(i,0,n)a[i]=read();
    cout<<a[0]<<' '; ll m=a[0];
    repeat(i,1,n)cout<<m+a[i]<<' ',m=max(m,m+a[i]);
    return 0;
}
```

## C. Permutation Partitions

求 $k$ 个块的最大值之和的最大值，等价于求 $k$ 个数之和的最大值，也就是最大的 $k$ 个数字加起来。

然后到了第二问，我们选定了 $k$ 个数字，然后将原序列分成 $k$ 部分，每部分恰好包含一个选定的数字。所以块与块的分界线必须要在选定的数之间，如果两个相邻选定的数字位置是 $pos_i,pos_{i+1}$，分界线的自由度就是 $pos_{i+1}-pos_i$，这些 $k-1$ 个自由度乘起来就是第二问答案了。

（~~代码有点混乱~~）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
typedef pair<int,int> pii;
const int N=200010,mod=998244353;
pii a[N];
ll ans1=0,ans2=1;
bool f[N];
signed main(){
    ios::sync_with_stdio(0); cin.tie(0);
    int n=read(),k=read();
    repeat(i,0,n)a[i].first=read(),a[i].second=i;
    sort(a,a+n,greater<pii>());
    repeat(i,0,k)f[a[i].second]=1,ans1+=a[i].first;
    int cnt=0,flag=0;
    repeat(i,0,n){
        if(f[i])ans2=ans2*(cnt+1)%mod,cnt=0,flag=1;
        else if(flag)cnt++;
    }
    cout<<ans1<<' '<<ans2<<endl;
    return 0;
}
```

## D2. Prefix-Suffix Palindrome (Hard version)

多种做法可以看稳赚大爹博客：<https://wzyxv1n.top/2020/03/20/Codeforces-1326D2/>。

我的做法就是先尽可能取走最多的对称前后缀，再对中间串跑马拉车，马拉车可以把计算所有极长回文串（就是不能再向两边延伸的回文串），每算一个就判断是否是中间串的边界。

比如 $abcdedghhgfcba$，先取两边，即 $abc$ 和 $cba$，剩下的 $dedghhgf$ 中最长的且在边界上的子串是 $ded$（$ghhg$ 不在边界上），因此答案是 $abcdedcba$。

这是我的代码，~~真·丑得一批~~（逃）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=2000010,mod=998244353;
int len[N],nxt[N];
char s[N],s2[N];
int ans=0,nn,p,x;
void solve(char s[]){
    int n=strlen(s)*2+1;
    repeat_back(i,0,n){
        if(i%2==0)s[i+1]='*';
        else s[i+1]=s[i/2];
    }
    n+=2;
    s[0]='#'; s[n-1]=0;
    len[0]=0;
    int mx=0,id=0;
    repeat(i,1,n-1){
        if(i<mx)len[i]=min(mx-i,len[2*id-i]);
        else len[i]=1;
        while(s[i-len[i]]==s[i+len[i]])len[i]++;
        if(len[i]+i>mx){
            mx=len[i]+i;
            id=i;
        }
        int l=(i-len[i]+1)/2;
        int r=l+len[i]-1-1;
        if(l>r)continue;
        //cout<<l<<' '<<r<<endl;
        if((l==0 || r==nn-1-x-x )&& ans<len[i]-1){
            ans=len[i]-1,p=(l==0);
        }
    }
}
signed main(){
    ios::sync_with_stdio(0); cin.tie(0);
    int T=read(); gets(s);
    while(T--){
        gets(s); ans=0;
        nn=strlen(s);
        strcpy(s2,s);
        x=nn;
        repeat(i,0,nn){
            if(s[i]!=s[nn-1-i])
                x=min(x,i);
        }
        if(x==nn){
            puts(s);
            continue;
        }
        s2[nn-x]=0;
        solve(s2+x);
        repeat(i,0,nn)
            if(i<x || i>nn-1-x ||
            (p==1 && i<x+ans) ||
            (p==0 && i>nn-1-x-ans))putchar(s[i]);
        puts("");
    }
    return 0;
}
```

## E. Bombs

我们分析一下：我们让 $ans$ 等于 $n$，每回合输出 $ans$，一旦发现不对劲让 $ans$ 减一。那么什么情况是不对劲的呢？一定是所有大于等于 $ans$ 的数都被炸掉了，也就是说如果我们维护一个数组 $A_i=$ 位置 $i$ 及之后大于等于 $ans$ 的数的个数，另一个数组 $B_i=$ 位置 $i$ 及之后的已经安放的炸弹个数（这两个数组都是动态变化的），如果所有位置都满足 $A_i\le B_i$，那就真的炸完了。

我们令线段树 $seg[i]=A_i-B_i$，如果全局最大值 $<=0$ 就说明不对劲了（炸没了），这时候让 $ans--$，并且让等于 $ans$ 的那个数加进 $A$ 数组，也就是线段树区间 $[1,pos_{ans}]$ 加 1；要安放下一枚炸弹就将区间 $[1,q_i]$ 减 1。

所以除掉线段树板子后代码真的简洁。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=300010;
int pos[N],q[N],n;

//**********线段树板子开始**********

struct seg{ //初始化init()修改查询tr->sth()
    #define U(x,y) max(x,y) //查询运算
    #define a0 -inf //查询运算的零元
    void toz(ll x){z+=x,state=1;} //加载到懒标记
    void toa(){a+=z,z=0,state=0;} //懒标记加载到数据（z别忘了清空）
    ll a,z; bool state; //数据，懒标记，是否偷了懒
    int l,r;
    seg *lc,*rc;
    void init(int,int);
    void up(){
        a=U(lc->a,rc->a);
    }
    void down(){
        if(!state)return;
        if(l<r){
            lc->toz(z);
            rc->toz(z);
        }
        toa();
    }
    void update(int x,int y,ll k){
        x=max(x,l); y=min(y,r); if(x>y){down();return;}
        if(x==l && y==r){
            toz(k);
            down();
            return;
        }
        down();
        lc->update(x,y,k);
        rc->update(x,y,k);
        up();
    }
    ll query(int x,int y){
        x=max(x,l); y=min(y,r); if(x>y)return a0;
        down();
        if(x==l && y==r)
            return a;
        return U(lc->query(x,y),rc->query(x,y));
    }
}tr[N*2],*pl;
void seg::init(int _l,int _r){
    l=_l,r=_r;
    state=0;
    if(l==r){
        a=0;
        return;
    }
    int m=(l+r)>>1;
    lc=++pl; lc->init(l,m);
    rc=++pl; rc->init(m+1,r);
    up();
}
void init(int l,int r){
    pl=tr;
    tr->init(l,r);
}

//**********线段树板子结束**********

void push_value(int p){
    tr->update(1,p,1);
}
void push_bomb(int p){
    tr->update(1,p,-1);
}
signed main(){
    ios::sync_with_stdio(0); cin.tie(0);
    n=read();
    repeat(i,1,n+1)pos[read()]=i;
    repeat(i,1,n+1)q[i]=read();
    int ans=n;
    init(1,n);
    push_value(pos[ans]);
    cout<<ans<<' ';
    repeat(i,1,n){
        push_bomb(q[i]);
        while(tr->query(1,n)<=0){
            ans--;
            push_value(pos[ans]);
        }
        cout<<ans<<' ';
    }
    return 0;
}
```
