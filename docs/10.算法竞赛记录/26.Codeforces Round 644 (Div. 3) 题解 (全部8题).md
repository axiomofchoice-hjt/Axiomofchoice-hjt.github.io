---
title: Codeforces Round 644 (Div. 3) 题解 (全部8题)
date: 2020-05-25 09:38:00
permalink: /pages/72eef0/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1360>

怎么回事，突然 8 题，我的肝啊。

## A. Minimal Square

直接输出。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll;
//#define int ll
int T,a,b;
signed main(){
    cin>>T;
    while(T--){
        cin>>a>>b;
        if(a>b)swap(a,b);
        cout<<(max(a+a,b))*(max(a+a,b))<<endl;
    }
    return 0;
}
```

## B. Honest Coach

找最相近的两个人。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll;
//#define int ll
int T,n,a[N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        repeat(i,0,n)cin>>a[i];
        sort(a,a+n);
        int ans=1e9;
        repeat(i,0,n-1)
            ans=min(ans,a[i+1]-a[i]);
        cout<<ans<<endl;
    }
    return 0;
}
```

## C. Similar Pairs

先判断奇数的个数（或者偶数）是否为偶数，偶数就一定 `YES`。

然后判断是否两个差为 1 的数，有就一定 `YES`。

第二种情况是因为，如果有两个差为 1 的数并且不满足第一种情况，可以把这两个数单独拎出来，然后就满足第一种情况了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll;
//#define int ll
int T,n,a[N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        repeat(i,0,n)cin>>a[i];
        sort(a,a+n);
        int flag=0,cnt[]={0,0};
        repeat(i,0,n){
            if(i!=n-1 && a[i+1]-a[i]==1)flag=1;
            cnt[a[i]%2]^=1;
        }
        cout<<(flag || cnt[0]==0?"YES":"NO")<<endl;
    }
    return 0;
}
```

## D. Buying Shovels

求 `[1,k]` 范围内的最大的 `n` 的因数，输出 `n` 除以这个数。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll;
//#define int ll
int T,n,k;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>k;
        int ans=1e9;
        for(int i=1;i*i<=n;i++)
        if(n%i==0){
            if(i<=k)ans=min(ans,n/i);
            if(n/i<=k)ans=min(ans,i);
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## E. Polygon

只要判断是否出现

```text
10
0?
```

的情况就行了（`?` 可以是 0 也可以是 1）。

因为这种情况，那个 1 一定是假的。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=110; typedef long long ll;
//#define int ll
int T,n;
char s[N][N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        repeat(i,0,n)cin>>s[i];
        repeat(i,0,n)s[i][n]=s[n][i]='1';
        int f=true;
        repeat(i,0,n)
        repeat(j,0,n)
        if(s[i][j]=='1' && s[i+1][j]=='0' && s[i][j+1]=='0')
            f=false;
        cout<<(f?"YES":"NO")<<endl;
    }
    return 0;
}
```

## F. Spy-string

以字符串 `s[0]` 为模板，作最多一个字符的改动。不确定如何改动？那就枚举所有可能的情况，这样时间也是够的。

`O(n^4)` 暴力，相信 cf 神机！~~奥利给~~。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=110; typedef long long ll;
//#define int ll
int T,n,m;
string s[N];
string ans;
bool ok(){
    repeat(i,0,n){
        int cnt=0;
        repeat(j,0,m)cnt+=(ans[j]!=s[i][j]);
        if(cnt>1)return 0;
    }
    return 1;
}
void solve(){
    cin>>n>>m;
    repeat(i,0,n)cin>>s[i];
    ans=s[0];
    repeat(i,0,n)
    repeat(j,0,m){
        int t=ans[j];
        ans[j]=s[i][j];
        if(ok()){cout<<ans<<endl; return;}
        ans[j]=t;
    }
    cout<<-1<<endl;
}
signed main(){
    cin>>T;
    while(T--){
        solve();
    }
    return 0;
}
```

## G. A/B Matrix

因为 1 的个数守恒，就有 `na=mb`，不满足直接 `NO` 走人。

然后只要每行放 `a` 个 1，下一行接上一行的位置即可。更准确地说，第一行在 `1,2,3,...,a` 位置上放 1，然后第二行在 `a+1,a+2,...,2a` 位置上放 1（当然都要对 `m` 取模）。这样弄完后可以证明，每一列都有 `b` 个 1。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=110; typedef long long ll;
//#define int ll
int T,n,m,a,b;
string ans[N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>m>>a>>b;
        if(n*a!=m*b){cout<<"NO"<<endl; continue;}
        cout<<"YES"<<endl;
        int x=0;
        repeat(i,0,n){
            ans[i].assign(m,'0');
            repeat(j,0,a){
                ans[i][(x++)%m]='1';
            }
            cout<<ans[i]<<endl;
        }
    }
    return 0;
}
```

## H. Binary Median

二分答案。

对于一个数，我们可以很快算出它在给定集合中的排名，而排名又满足单调性，因此二分答案直接开莽。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=110; typedef long long ll;
#define int ll
int T,n,m;
string s;
int a[N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>m;
        repeat(i,0,n){
            cin>>s;
            a[i]=bitset<64>(s).to_ullong();
        }
        sort(a,a+n);
        int l=0,r=1ll<<m,f=((1ll<<m)-n-1)/2;
        while(l<=r){
            int mid=(l+r)/2;
            int cnt=mid-(upper_bound(a,a+n,mid)-a); //这个upperbound可以直接for一遍也无所谓
            if(cnt<f)l=mid+1; else r=mid-1;
        }
        cout<<bitset<64>(l).to_string().substr(64-m,-1)<<endl;
    }
    return 0;
}
```
